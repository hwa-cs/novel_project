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
exports.join = exports.login = exports.logout = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../models/user"));
const post_1 = __importDefault(require("../models/post"));
const cover_1 = __importDefault(require("../models/cover"));
const join = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, nick, password } = req.body;
    // 입력 데이터 유효성 검사
    if (!email || !nick || !password) {
        res.status(400).json({ error: '모든 필드를 입력해주세요.' });
        return;
    }
    try {
        // 이미 존재하는 사용자 확인
        const exUser = yield user_1.default.findOne({ where: { email } });
        if (exUser) {
            res.status(409).json({ error: '이미 가입된 이메일입니다.' });
            return;
        }
        // 비밀번호 해시 생성
        const hash = yield bcrypt_1.default.hash(password, 12);
        // 새로운 사용자 생성
        yield user_1.default.create({
            email,
            nick,
            password: hash,
        });
        res.status(201).json({ success: '회원가입이 성공적으로 완료되었습니다.' });
        return;
    }
    catch (error) {
        console.error('회원가입 중 에러 발생:', error);
        res.status(500).json({ error: '서버 에러가 발생했습니다. 다시 시도해주세요.' });
        return;
    }
});
exports.join = join;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('local', (authError, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (authError) {
            console.error(authError);
            return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
        }
        if (!user) {
            return res.status(401).json({ error: "존재하지 않는 계정입니다. " }); // JSON 형식의 에러 응답
        }
        // 로그인 성공 시 user 객체에 로그인 진행
        return req.login(user, (loginError) => __awaiter(void 0, void 0, void 0, function* () {
            if (loginError) {
                console.error(loginError);
                return res.status(500).json({ error: '로그인 과정에서 오류가 발생했습니다.' });
            }
            console.log('세션데이터: ', req.session);
            try {
                // 사용자 정보 추출
                const data = { 'id': user.id, 'email': user.email, 'nick': user.nick, 'provider': user.provider, 'password': user.password };
                // 포스트 데이터 비동기적으로 가져오기
                const posts = yield post_1.default.findAll({
                    attributes: ['content', 'makeContent'],
                    where: { userId: user.id },
                    order: [['createdAt', 'DESC']],
                    limit: 10,
                });
                const Covers = yield cover_1.default.findAll({
                    attributes: ['makeCover'],
                    where: { userId: user.id },
                    order: [['createdAt', "DESC"]],
                    limit: 6,
                    raw: true
                });
                // 포스트 데이터 처리
                const postData = posts.map(post => ({
                    content: post.content,
                    makeContent: post.makeContent,
                }));
                // 성공적인 로그인 응답
                return res.status(200).json({
                    message: '로그인 성공',
                    data,
                    posts: postData,
                    covers: Covers,
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: '포스트 데이터를 가져오는 중에 오류가 발생했습니다.' });
            }
        }));
    }))(req, res, next); // 미들웨어 내 미들웨어 호출
});
exports.login = login;
const logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
};
exports.logout = logout;
