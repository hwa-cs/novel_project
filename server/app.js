"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
const user_1 = __importDefault(require("./routes/user"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const ioredis_1 = __importDefault(require("ioredis")); // ioredis 모듈 임포트
const connect_redis_1 = __importDefault(require("connect-redis")); // 7.x.x로 수정
const passport_1 = __importDefault(require("passport"));
const auth_1 = __importDefault(require("./routes/auth"));
const passport_2 = __importDefault(require("./passport"));
dotenv_1.default.config(); // process.
const options = {
    cert: fs_1.default.readFileSync('/etc/letsencrypt/live/www.koimang.duckdns.org/fullchain.pem'),
    key: fs_1.default.readFileSync('/etc/letsencrypt/live/www.koimang.duckdns.org/privkey.pem'),
};
const redisClient = new ioredis_1.default({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD || '', // 비밀번호 설정 (필요한 경우)
});
// import pageRouter from './routes/page';
const post_1 = __importDefault(require("./routes/post"));
const app = (0, express_1.default)();
// SSL 인증서와 키 파일 경로 설정
// const options = {
//     cert: fs.readFileSync('/opt/bitnami/apache/conf/bitnami/certs/server.crt'),
//     key: fs.readFileSync('/opt/bitnami/apache/conf/bitnami/certs/server.key'),
// };
(0, passport_2.default)();
// 모든 도메인에서의 요청 허용
app.use((0, cors_1.default)({ origin: 'https://www.koimang.duckdns.org', credentials: true }));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
// express-session 미들웨어 설정
const sessionOption = {
    store: new connect_redis_1.default({
        client: redisClient, // Redis 클라이언트를 전달
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        domain: 'koimang.duckdns.org', // 기본 도메인 설정
        httpOnly: true,
        secure: true, // 기본 도메인은 HTTPS만 사용
        maxAge: 1000 * 60 * 60 * 24, // 세션 만료 시간
        sameSite: 'none', // CORS 허용
    },
};
if (process.env.NODE_ENV === 'production') {
    sessionOption.proxy = true;
    sessionOption.cookie.secure = true;
}
app.use((0, express_session_1.default)(sessionOption));
// passport 초기화와 세션 설정
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_1.default.json()); // JSON 형식의 요청 본문을 파싱
app.use(express_1.default.urlencoded({ extended: false })); // URL 인코딩된 요청 본문을 파싱
app.use('/api/users', user_1.default);
app.use('/api/auth', auth_1.default);
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
app.use('/api/post', post_1.default);
if (process.env.NODE_ENV === 'production') {
    app.enable('trust proxy');
    app.use((0, hpp_1.default)());
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
        crossOriginOpenerPolicy: { policy: 'unsafe-none' },
    }));
    app.use((0, morgan_1.default)('combined'));
    // HTTPS 강제 리디렉션 설정
    app.use((req, res, next) => {
        if (!req.secure) {
            return res.redirect(`https://${req.headers.host}${req.url}`);
        }
        next();
    });
}
app.use(express_1.default.static(path_1.default.join(__dirname, 'public'))); // 보안상 다른 폴더는 접근 불가능하지만 public폴더는 허용
app.use(express_1.default.static(path_1.default.join(__dirname, '../client/novel_client/dist')));
// 2. 모든 경로에 대해 React의 index.html 파일을 반환하는 라우트 설정
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../client/novel_client/dist', 'index.html'));
});
// app.use('/api', pageRouter);
models_1.sequelize
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
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
};
app.use(errorHandler);
// HTTP에서 HTTPS로 리디렉션 (이제 express가 자동으로 처리)
// http.createServer(app).listen(80, () => {
//     console.log('HTTP 서버가 80 포트에서 리디렉션 대기 중');
// });
// HTTPS 서버로 443 포트에서 서비스
https_1.default.createServer(options, app).listen(443, () => {
    console.log('HTTPS 서버가 443 포트에서 실행 중');
});
