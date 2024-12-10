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
const post_1 = __importDefault(require("../models/post"));
const cover_1 = __importDefault(require("../models/cover"));
const passport_1 = __importDefault(require("passport"));
const userData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('local', (authError, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.user) {
                return res.status(401).json({ error: "Unauthorized: User not found" });
            }
            console.log('유저 유제!! :', req.user.id);
            const id = req.user.id;
            // 포스트 데이터 비동기적으로 가져오기
            const posts = yield post_1.default.findAll({
                attributes: ['content', 'makeContent'],
                where: { userId: id },
                order: [['createdAt', 'DESC']],
                limit: 10,
            });
            const Covers = yield cover_1.default.findAll({
                attributes: ['makeCover'],
                where: { userId: id },
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
                posts: postData,
                covers: Covers,
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: '포스트 데이터를 가져오는 중에 오류가 발생했습니다.' });
        }
    }))(req, res, next);
}); // 미들웨어 내 미들웨어 호출
exports.default = userData;
