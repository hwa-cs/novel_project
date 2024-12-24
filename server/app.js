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
const http_1 = __importDefault(require("http"));
const ioredis_1 = __importDefault(require("ioredis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = __importDefault(require("./routes/auth"));
const post_1 = __importDefault(require("./routes/post"));
const passport_2 = __importDefault(require("./passport"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const isProduction = process.env.NODE_ENV === 'production';
(0, passport_2.default)();
// Redis 클라이언트 설정
const redisClient = new ioredis_1.default({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD || '',
});
// 세션 옵션 설정
const sessionOption = {
    store: new connect_redis_1.default({
        client: redisClient,
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
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
app.use((0, express_session_1.default)(sessionOption));
// 미들웨어 설정
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use((0, cors_1.default)({
    origin: isProduction
        ? 'https://www.koimang.duckdns.org'
        : 'http://localhost:5173',
    credentials: true,
}));
app.use((0, morgan_1.default)(isProduction ? 'combined' : 'dev'));
if (isProduction) {
    app.enable('trust proxy');
    app.use((0, hpp_1.default)());
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
        crossOriginOpenerPolicy: { policy: 'unsafe-none' },
    }));
}
// Passport 초기화 및 세션 설정
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// 라우터 설정
app.use('/api/users', user_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/post', post_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.static(path_1.default.join(__dirname, '../client/novel_client/dist')));
// React 앱의 index.html 반환
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../client/novel_client/dist', 'index.html'));
});
// 데이터베이스 연결
models_1.sequelize
    .sync({ force: false })
    .then(() => {
    console.log('데이터베이스 연결 성공');
})
    .catch((err) => {
    console.error('데이터베이스 연결 실패', err);
    process.exit(1);
});
// 에러 핸들링
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
};
app.use(errorHandler);
// const PORT = 8001;
// const HOST = '192.168.104.7'; 
if (isProduction) {
    // HTTPS 서버 설정
    const options = {
        cert: fs_1.default.readFileSync('/etc/letsencrypt/live/www.koimang.duckdns.org/fullchain.pem'),
        key: fs_1.default.readFileSync('/etc/letsencrypt/live/www.koimang.duckdns.org/privkey.pem'),
    };
    https_1.default.createServer(options, app).listen(443, () => {
        console.log('Production HTTPS 서버가 443 포트에서 실행 중');
    });
    http_1.default.createServer((req, res) => {
        res.writeHead(301, {
            Location: `https://${req.headers.host}${req.url}`,
        });
        res.end();
    }).listen(80, () => {
        console.log('HTTP 서버가 80 포트에서 리디렉션 대기 중');
    });
}
else {
    //   로컬 개발 서버 설정
    app.listen(8001, () => {
        console.log('Development 서버가 http://localhost:8001 에서 실행 중');
    });
}
// app.listen(PORT, HOST, () => {
// console.log(`Server is running at http://${HOST}:${PORT}`);
// });
// }
