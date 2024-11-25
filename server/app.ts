import express, { ErrorRequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';
import { sequelize } from './models';
import userRouter from './routes/user';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import passport from 'passport';
import authRouter from './routes/auth';
import passportConfig from './passport';

dotenv.config(); // process.env
import pageRouter from './routes/page';

const app = express();

passportConfig()

// 모든 도메인에서의 요청 허용
app.use(cors());
// 특정 도메인만 허용
// app.use(cors({ origin: 'http://localhost:5173' }));


// 1. express-session 미들웨어 먼저 설정
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET!,
        cookie: {
            httpOnly: true,
            secure: false,  // 개발 환경에서는 false로 설정
        },
    })
);

// 2. passport 초기화와 세션 설정
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());  // JSON 형식의 요청 본문을 파싱
app.use(express.urlencoded({ extended: false }));  // URL 인코딩된 요청 본문을 파싱

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter)
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
app.use('/api/img', express.static(path.join(__dirname, 'uploads')));

app.use(morgan('dev')) // 개발 모드로 설정 
app.use(express.static(path.join(__dirname, 'public'))); // 보안상 다른 폴더는 접근 불가능하지만 public폴더는 허용

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/api', pageRouter)
nunjucks.configure('views', {
    express: app,
    watch: true,
});

sequelize.sync({ force: true })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error('데이터베이스 연결 실패', err);
        process.exit(1);  // 또는 적절한 에러 응답을 클라이언트에 전달
    });

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
};

app.use(errorHandler);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});
