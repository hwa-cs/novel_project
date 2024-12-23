import express, { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import helmet from 'helmet';
import hpp from 'hpp';
import dotenv from 'dotenv';
import { sequelize } from './models';
import userRouter from './routes/user';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import http from 'http';
import Redis from 'ioredis';
import RedisStore from 'connect-redis';
import passport from 'passport';
import authRouter from './routes/auth';
import postRouter from './routes/post';
import passportConfig from './passport';

dotenv.config();

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
passportConfig();

// Redis 클라이언트 설정
const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD || '',
});

// 세션 옵션 설정
const sessionOption: session.SessionOptions = {
  store: new RedisStore({
    client: redisClient,
  }),
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET!,
  cookie: {
    domain: isProduction ? 'koimang.duckdns.org' : undefined,
    httpOnly: true,
    secure: isProduction,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: isProduction ? 'none' : 'lax',
  },
};

if (isProduction) {
  sessionOption.proxy = true;
}

app.use(session(sessionOption));

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  cors({
    origin: isProduction
      ? 'https://www.koimang.duckdns.org'
      : 'http://localhost:5173',
    credentials: true,
  })
);

app.use(morgan(isProduction ? 'combined' : 'dev'));

if (isProduction) {
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
}

// Passport 초기화 및 세션 설정
app.use(passport.initialize());
app.use(passport.session());

// 라우터 설정
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/novel_client/dist')));

// React 앱의 index.html 반환
app.get('*', (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, '../client/novel_client/dist', 'index.html')
  );
});

// 데이터베이스 연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error('데이터베이스 연결 실패', err);
    process.exit(1);
  });

// 에러 핸들링
const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500).json({ error: err.message });
};

app.use(errorHandler);

if (isProduction) {
  // HTTPS 서버 설정
  const options = {
    cert: fs.readFileSync(
      '/etc/letsencrypt/live/www.koimang.duckdns.org/fullchain.pem'
    ),
    key: fs.readFileSync(
      '/etc/letsencrypt/live/www.koimang.duckdns.org/privkey.pem'
    ),
  };

  https.createServer(options, app).listen(443, () => {
    console.log('Production HTTPS 서버가 443 포트에서 실행 중');
  });

  http.createServer((req, res) => {
    res.writeHead(301, {
      Location: `https://${req.headers.host}${req.url}`,
    });
    res.end();
  }).listen(80, () => {
    console.log('HTTP 서버가 80 포트에서 리디렉션 대기 중');
  });
} else {
  // 로컬 개발 서버 설정
  app.listen(8001, () => {
    console.log('Development 서버가 http://localhost:8001 에서 실행 중');
  });
}
