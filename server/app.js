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
const nunjucks_1 = __importDefault(require("nunjucks"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
const user_1 = __importDefault(require("./routes/user"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = __importDefault(require("./routes/auth"));
const passport_2 = __importDefault(require("./passport"));
dotenv_1.default.config(); // process.env
const page_1 = __importDefault(require("./routes/page"));
const app = (0, express_1.default)();
(0, passport_2.default)();
// 모든 도메인에서의 요청 허용
app.use((0, cors_1.default)());
// 특정 도메인만 허용
// app.use(cors({ origin: 'http://localhost:5173' }));
// 1. express-session 미들웨어 먼저 설정
app.use((0, express_session_1.default)({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false, // 개발 환경에서는 false로 설정
    },
}));
// 2. passport 초기화와 세션 설정
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_1.default.json()); // JSON 형식의 요청 본문을 파싱
app.use(express_1.default.urlencoded({ extended: false })); // URL 인코딩된 요청 본문을 파싱
app.use('/api/users', user_1.default);
app.use('/api/auth', auth_1.default);
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
app.use('/api/img', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use((0, morgan_1.default)('dev')); // 개발 모드로 설정 
app.use(express_1.default.static(path_1.default.join(__dirname, 'public'))); // 보안상 다른 폴더는 접근 불가능하지만 public폴더는 허용
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use('/api', page_1.default);
nunjucks_1.default.configure('views', {
    express: app,
    watch: true,
});
models_1.sequelize.sync({ force: true })
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
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});
