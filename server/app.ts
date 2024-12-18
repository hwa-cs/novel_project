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
import http from 'http';

import passport from 'passport';
import authRouter from './routes/auth';
import passportConfig from './passport';

dotenv.config();

import pageRouter from './routes/page';
import postRouter from './routes/post';

const app = express();

// SSL 인증서와 키 파일 경로 설정
const options = {
  cert: fs.readFileSync('/opt/bitnami/apache/conf/bitnami/certs/server.crt'),
  key: fs.readFileSync('/opt/bitnami/apache/conf/bitnami/certs/server.key'),
};

passportConfig();

// CORS 설정
app.use(cors({ origin: true, credentials: true }));

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

// Passport 초기화와 세션 설정
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json()); // JSON 형식의 요청 본문을 파싱
app.use(express.urlencoded({ extended: false })); // URL 인코딩된 요청 본문을 파싱

// 라우터 설정
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
app.use('/api', pageRouter);

if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy'); // Proxy 서버 신뢰 설정
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
  app.use(morgan('dev')); // 개발 모드 로그 설정
}

app.use(express.static(path.join(__dirname, 'public'))); // Static 파일 경로
app.use(express.static(path.join(__dirname, '../client/novel_client/dist')));

// 모든 경로에 대해 React의 index.html 반환
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/novel_client/dist', 'index.html'));
});

nunjucks.configure('views', {
  express: app,
  watch: true,
});

// Sequelize 연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error('데이터베이스 연결 실패', err);
    process.exit(1);
  });

// 404 처리 미들웨어
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  (error as any).status = 404;
  next(error);
});

// 에러 핸들러 미들웨어
const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status((err as any).status || 500);
  res.render('error');
};

app.use(errorHandler);

// HTTP -> HTTPS 리디렉션
if (process.env.NODE_ENV === 'production') {
  http.createServer((req, res) => {
    const host = req.headers.host;
    const url = req.url;

    // HTTP -> HTTPS 리디렉션
    res.writeHead(301, { Location: `https://${host}${url}` });
    res.end();
  }).listen(80, () => {
    console.log('HTTP 서버가 80 포트에서 리디렉션 대기 중');
  });
}

// HTTPS 서버 실행
https.createServer(options, app).listen(443, () => {
  console.log('HTTPS 서버가 443 포트에서 실행 중');
});
