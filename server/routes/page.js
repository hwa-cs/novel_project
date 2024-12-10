"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const page_1 = require("../controllers/page");
const router = express_1.default.Router();
router.use((req, res, next) => {
    res.locals.user = req.user;
    // res.locals는 미들웨어간 공유되는 데이터
    // req.session는 로그아욷 전까지 사용자들 끼리 공유된는 데이터
    next();
});
router.get('/join', page_1.renderJoin);
// 회원가입
router.get('/', page_1.renderMain);
// 메인 페이지
exports.default = router;
