"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const axios_1 = __importDefault(require("axios"));
const middlewares_1 = require("../middlewares");
const auth_1 = require("../controllers/auth");
const router = express_1.default.Router();
router.post('/join', middlewares_1.isNotLoggedIn, auth_1.join); // 회원가입
router.post('/login', middlewares_1.isNotLoggedIn, auth_1.login); // 로그인
router.get('/logout', middlewares_1.isLoggedIn, auth_1.logout); // 로그아웃
router.get('/kakao', passport_1.default.authenticate('kakao'));
router.get('/kakao/callback', passport_1.default.authenticate('kakao', { failureRedirect: '/?error=카카오로그인 실패' }), (req, res) => {
    res.redirect('/api'); // 성공 시 이동
});
// 핸들러 타입을 명시적으로 지정
const kakaoLogoutHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const ACCESS_TOKEN = (_a = req.user) === null || _a === void 0 ? void 0 : _a.accessToken;
        if (!ACCESS_TOKEN) {
            res.status(400).json({ message: 'Access token not found' });
            return; // 여기서 반환하여 Promise<void>를 보장
        }
        // 카카오 로그아웃 처리
        yield (0, axios_1.default)({
            method: 'post',
            url: 'https://kapi.kakao.com/v1/user/unlink',
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        });
        // 비동기 로그아웃
        yield new Promise((resolve, reject) => {
            req.logout((err) => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
        req.session.destroy((err) => {
            if (err) {
                console.error('Session destruction error:', err);
                res.status(500).json({ message: 'Failed to destroy session' });
                return; // 여기서 반환하여 Promise<void>를 보장
            }
            res.redirect('/api');
        });
    }
    catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Logout failed', error });
    }
});
router.get('/kakao/logout', kakaoLogoutHandler);
exports.default = router;
