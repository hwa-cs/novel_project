"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const page_1 = require("../controllers/page");
const router = express_1.default.Router();
router.use((req, res, next) => {
    var _a, _b, _c, _d, _e, _f;
    res.locals.user = req.user;
    res.locals.followerCount = ((_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.Followers) === null || _b === void 0 ? void 0 : _b.length) || 0;
    res.locals.followingCount = ((_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.Followings) === null || _d === void 0 ? void 0 : _d.length) || 0;
    res.locals.followingIdList = ((_f = (_e = req.user) === null || _e === void 0 ? void 0 : _e.Followings) === null || _f === void 0 ? void 0 : _f.map(f => f.id)) || [];
    // res.locals는 미들웨어간 공유되는 데이터
    // req.session는 로그아욷 전까지 사용자들 끼리 공유된는 데이터
    next();
});
router.get('/profile', page_1.renderProfile);
// 프로필
router.get('/join', page_1.renderJoin);
// 회원가입
router.get('/', page_1.renderMain);
// 메인 페이지
router.get('/reserve_1', page_1.renderReserve_1);
router.get('/reserve_2', page_1.renderReserve_2);
router.get('/reserve_3', page_1.renderReserve_3);
exports.default = router;
