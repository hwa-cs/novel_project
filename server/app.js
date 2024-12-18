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
const nunjucks_1 = __importDefault(require("nunjucks"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
const user_1 = __importDefault(require("./routes/user"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http")); // http 모듈 추가
const passport_1 = __importDefault(require("passport"));
const auth_1 = __importDefault(require("./routes/auth"));
const passport_2 = __importDefault(require("./passport"));
dotenv_1.default.config(); // process.
const page_1 = __importDefault(require("./routes/page"));
const post_1 = __importDefault(require("./routes/post"));
const app = (0, express_1.default)();
// SSL 인증서와 키 파일 경로 설정
const options = {
    cert: fs_1.default.readFileSync('/opt/bitnami/apache/conf/bitnami/certs/server.crt'),
    key: fs_1.default.readFileSync('/opt/bitnami/apache/conf/bitnami/certs/server.key'),
};
(0, passport_2.default)();
// 모든 도메인에서의 요청 허용
app.use((0, cors_1.default)({ origin: true, credentials: true }));
// 특정 도메인만 허용
// app.use(cors({ origin: 'http://localhost:5173' }));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
// express-session 미들웨어 설정
const sessionOption = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // 프로덕션 환경에서는 secure 설정
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
}
else {
    app.use((0, morgan_1.default)('dev')); // 개발 모드로 설정
}
app.use(express_1.default.static(path_1.default.join(__dirname, 'public'))); // 보안상 다른 폴더는 접근 불가능하지만 public폴더는 허용
app.use(express_1.default.static(path_1.default.join(__dirname, '../client/novel_client/dist')));
// 2. 모든 경로에 대해 React의 index.html 파일을 반환하는 라우트 설정
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../client/novel_client/dist', 'index.html'));
});
app.use('/api', page_1.default);
nunjucks_1.default.configure('views', {
    express: app,
    watch: true,
});
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
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
};
app.use(errorHandler);
// HTTP에서 HTTPS로 리디렉션 (리디렉션을 하기 위해 Response 타입을 명시적으로 지정)
http_1.default.createServer((req, res) => {
    // any 타입으로 변경
    // req와 res를 Express 타입으로 처리
    const expressReq = req;
    const expressRes = res;
    expressRes.redirect(301, `https://${expressReq.headers.host}${expressReq.url}`);
}).listen(80, () => {
    console.log('HTTP 서버가 80 포트에서 리디렉션 대기 중');
});
// HTTPS 서버로 443 포트에서 서비스
https_1.default.createServer(options, app).listen(443, () => {
    console.log('HTTPS 서버가 443 포트에서 실행 중');
});
