import express, { ErrorRequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import helmet from 'helmet';
import hpp from 'hpp';
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';
import { sequelize } from './models';
import userRouter from './routes/user';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import fs from 'fs';
import https from 'https';

import passport from 'passport';
import authRouter from './routes/auth';
import passportConfig from './passport';

dotenv.config(); // process.

import pageRouter from './routes/page';
import postRouter from './routes/post';

const app = express();

// SSL 인증서와 키 파일 경로 설정
const options = {
    cert: fs.readFileSync('/opt/bitnami/apache/conf/bitnami/certs/server.crt'),
    key: fs.readFileSync('/opt/bitnami/apache/conf/bitnami/certs/server.key'),
};
passportConfig();

// 모든 도메인에서의 요청 허용
app.use(cors({ origin: true, credentials: true }));
// 특정 도메인만 허용
// app.use(cors({ origin: 'http://localhost:5173' }));

app.use(cookieParser(process.env.COOKIE_SECRET));

// express-session 미들웨어 설정
const sessionOption: session.SessionOptions = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET!,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // 프로덕션 환경에서는 secure 설정
    },
};
if (process.env.NODE_ENV === 'production') {
    sessionOption.proxy = true;
    sessionOption.cookie!.secure = true;
}

app.use(session(sessionOption));

// passport 초기화와 세션 설정
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json()); // JSON 형식의 요청 본문을 파싱
app.use(express.urlencoded({ extended: false })); // URL 인코딩된 요청 본문을 파싱

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
app.use('/api/post', postRouter);

if (process.env.NODE_ENV === 'production') {
    app.enable('trust proxy');
    app.use(hpp());
    app.use(
        helmet({
            contentSecurityPolicy: false,
            crossOriginEmbedderPolicy: false,
            crossOriginResourcePolicy: false,
            crossOriginOpenerPolicy: { policy: 'unsafe-none' },
        })
    );
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev')); // 개발 모드로 설정
}

app.use(express.static(path.join(__dirname, 'public'))); // 보안상 다른 폴더는 접근 불가능하지만 public폴더는 허용
app.use(express.static(path.join(__dirname, '../client/novel_client/dist')));

// 2. 모든 경로에 대해 React의 index.html 파일을 반환하는 라우트 설정
app.get('*', (req: Request, res: Response) => {
    res.sendFile(
        path.join(__dirname, '../client/novel_client/dist', 'index.html')
    );
});

app.use('/api', pageRouter);

nunjucks.configure('views', {
    express: app,
    watch: true,
});

sequelize
    .sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error('데이터베이스 연결 실패', err);
        process.exit(1); // 또는 적절한 에러 응답을 클라이언트에 전달
    });

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

const errorHandler: ErrorRequestHandler = (
    err,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
};

app.use(errorHandler);

// HTTP에서 HTTPS로 리디렉션 (리디렉션을 하기 위해 Response 타입을 명시적으로 지정)
app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.protocol === 'http') {
        return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
});

// HTTPS 서버로 443 포트에서 서비스
https.createServer(options, app).listen(443, () => {
    console.log('HTTPS 서버가 443 포트에서 실행 중');
});
