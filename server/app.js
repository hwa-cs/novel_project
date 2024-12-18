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
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const models_1 = require("./models");
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const page_1 = __importDefault(require("./routes/page"));
const post_1 = __importDefault(require("./routes/post"));
const passport_2 = __importDefault(require("./passport"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Passport 초기화
(0, passport_2.default)();
// CORS 설정 (배포 환경에서 클라이언트 도메인 명시)
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production' ? 'https://your-client-domain.com' : true,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
// express-session 설정
const sessionOption = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
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
app.use((0, express_session_1.default)(sessionOption));
// Passport 초기화 및 세션 연결
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// 로깅 미들웨어 추가
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log('Set-Cookie 헤더:', res.getHeaders()['set-cookie']);
    });
    next();
});
// HTTP -> HTTPS 리디렉션 미들웨어 (프로덕션 환경 전용)
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (!req.secure) {
            return res.redirect(301, `https://${req.headers.host}${req.url}`);
        }
        next();
    });
}
// 라우터 설정
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api/users', user_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/page', page_1.default);
app.use('/api/post', post_1.default);
// 정적 파일 서빙
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.static(path_1.default.join(__dirname, '../client/novel_client/dist')));
// React의 index.html 반환
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../client/novel_client/dist', 'index.html'));
});
// Helmet 및 HPP 설정 (프로덕션 환경)
if (process.env.NODE_ENV === 'production') {
    app.use((0, hpp_1.default)());
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
        crossOriginOpenerPolicy: { policy: 'unsafe-none' },
    }));
    app.use((0, morgan_1.default)('combined'));
}
else {
    app.use((0, morgan_1.default)('dev'));
}
// Sequelize 연결
models_1.sequelize
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
const errorHandler = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
};
app.use(errorHandler);
// HTTPS 서버 및 HTTP -> HTTPS 리디렉션
const options = {
    cert: fs_1.default.readFileSync('/opt/bitnami/apache/conf/bitnami/certs/server.crt'),
    key: fs_1.default.readFileSync('/opt/bitnami/apache/conf/bitnami/certs/server.key'),
};
https_1.default.createServer(options, app).listen(443, () => {
    console.log('HTTPS 서버가 443 포트에서 실행 중');
});
http_1.default.createServer(app).listen(80, () => {
    console.log('HTTP 서버가 80 포트에서 리디렉션 대기 중');
});
