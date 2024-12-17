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
router.get('/kakao', passport_1.default.authenticate('kakao')); // 카카오 로그인  패스폴트
router.get('/naver', passport_1.default.authenticate('naver'));
router.get('/kakao/callback', passport_1.default.authenticate('kakao', { failureRedirect: '/?error=카카오로그인 실패' }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log('카카오 로그인 유저', user);
    // user가 존재하는지 확인
    if (!user) {
        res.status(400).json({ message: 'User not found' });
        return; // Promise<void>를 보장
    }
    // 클라이언트로 리다이렉트 
    res.redirect(`http://3.39.222.228/callback?nickname=${user.nick}&email=${user.email}&provider=${user.provider}&id=${user.id}&accessToken=${user.accessToken}`);
    return; // 명시적으로 void 반환
}));
router.get('/naver/callback', passport_1.default.authenticate('naver', { failureRedirect: '/?error=네이버 로그인 실패' }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // user가 존재하는지 확인
    if (!user) {
        res.status(400).json({ message: 'User not found' });
        return; // Promise<void>를 보장
    }
    // 클라이언트로 리다이렉트 
    res.redirect(`http://3.39.222.228/callback?nickname=${user.nick}&email=${user.email}&provider=${user.provider}&id=${user.id}&accessToken=${user.accessToken}`);
    return; // 명시적으로 void 반환
}));
// 핸들러 타입을 명시적으로 지정
const kakaoLogoutHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const ACCESS_TOKEN = (_a = req.user) === null || _a === void 0 ? void 0 : _a.accessToken;
        console.log('서버측 엑세스 토큰 :', (_b = req.user) === null || _b === void 0 ? void 0 : _b.accessToken);
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
const naverLogoutHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const ACCESS_TOKEN = (_a = req.user) === null || _a === void 0 ? void 0 : _a.accessToken;
        console.log('서버측 엑세스 토큰 :', ACCESS_TOKEN);
        if (!ACCESS_TOKEN) {
            res.status(400).json({ message: 'Access token not found' });
            return;
        }
        // 네이버 액세스 토큰 검증 후 세션 로그아웃
        try {
            // 네이버 로그아웃 API 호출 (엔드포인트 확인 필요)
            const response = yield (0, axios_1.default)({
                method: 'get',
                url: 'https://openapi.naver.com/v1/nid/logout',
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
            });
            console.log('네이버 로그아웃 응답:', response.data);
        }
        catch (apiError) {
            console.warn('네이버 로그아웃 API 호출 실패:', apiError);
            // 계속 진행
        }
        // Express의 로그아웃 처리
        yield new Promise((resolve, reject) => {
            req.logout((err) => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
        // 세션 종료
        req.session.destroy((err) => {
            if (err) {
                console.error('Session destruction error:', err);
                res.status(500).json({ message: 'Failed to destroy session' });
                return;
            }
            res.redirect('/api');
        });
    }
    catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Logout failed', error });
    }
});
router.get('/naver/logout', naverLogoutHandler);
exports.default = router;
