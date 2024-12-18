import express, { ErrorRequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import http from 'http';

import dotenv from 'dotenv';
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { sequelize } from './models';
import userRouter from './routes/user';
import authRouter from './routes/auth';
import pageRouter from './routes/page';
import postRouter from './routes/post';
import passportConfig from './passport';

dotenv.config();

const app = express();

// Passport 초기화
passportConfig();

// CORS 설정 (배포 환경에서 클라이언트 도메인 명시)
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://d3w156fo7jhtwu.cloudfront.net' : true,
    credentials: true,
  })
);

app.use(cookieParser(process.env.COOKIE_SECRET));

// express-session 설정
const sessionOption: session.SessionOptions = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET!,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // HTTPS에서만 쿠키 전달
  },
};

if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy'); // 프록시 환경 활성화
  sessionOption.proxy = true;
  sessionOption.cookie = {
    httpOnly: true,
    secure: true,
    sameSite: 'none', // CORS 환경에서 쿠키 전달 허용
  };
}

app.use(session(sessionOption));

// Passport 초기화 및 세션 연결
app.use(passport.initialize());
app.use(passport.session());

// 로깅 미들웨어 추가
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log('Set-Cookie 헤더:', res.getHeaders()['set-cookie']);
  });
  next();
});

// 라우터 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/page', pageRouter);
app.use('/api/post', postRouter);

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/novel_client/dist')));

// React의 index.html 반환
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/novel_client/dist', 'index.html'));
});

// Helmet 및 HPP 설정 (프로덕션 환경)
if (process.env.NODE_ENV === 'production') {
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
  app.use(morgan('dev'));
}

// Sequelize 연결
sequelize
  .sync({ force: false })
  .then(() => console.log('데이터베이스 연결 성공'))
  .catch((err) => {
    console.error('데이터베이스 연결 실패', err);
    process.exit(1);
  });

// 에러 핸들러
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

// HTTPS 서버 및 HTTP -> HTTPS 리디렉션
const options = {
  cert: fs.readFileSync('/opt/bitnami/apache/conf/bitnami/certs/server.crt'),
  key: fs.readFileSync('/opt/bitnami/apache/conf/bitnami/certs/server.key'),
};

https.createServer(options, app).listen(443, () => {
  console.log('HTTPS 서버가 443 포트에서 실행 중');
});

http.createServer((req, res) => {
  const host = req.headers.host;
  const url = req.url;

  // HTTP -> HTTPS 리디렉션
  res.writeHead(301, { Location: `https://${host}${url}` });
  res.end();
}).listen(80, () => {
  console.log('HTTP 서버가 80 포트에서 리디렉션 대기 중');
});