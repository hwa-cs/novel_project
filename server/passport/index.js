"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const localStrategy_1 = __importDefault(require("./localStrategy"));
const kakaoStrategy_1 = __importDefault(require("./kakaoStrategy"));
const user_1 = __importDefault(require("../models/user"));
const naverStrategy_1 = __importDefault(require("./naverStrategy"));
exports.default = () => {
    passport_1.default.serializeUser((user, done) => {
        // console.log('시리얼라이즈 유저', user); // user는 tokenUser다.
        // 로그인 시, 사용자 데이터를 세션에 저장하는데
        // done(null, {id : user.id, accessToken : user.accessToken});
        done(null, user.id);
    });
    passport_1.default.deserializeUser((id, done) => {
        // console.log('Deserializing user with id:', id); // 로그 추가
        user_1.default.findOne({
            where: { id },
            include: [
                {
                    model: user_1.default,
                    attributes: ['id', 'nick'],
                    as: 'Followers',
                },
                {
                    model: user_1.default,
                    attributes: ['id', 'nick'],
                    as: 'Followings',
                },
            ],
        })
            .then((user) => {
            // console.log('User found during deserialization:', user); // 로그 추가
            done(null, user); // req.user 설정
        })
            .catch((err) => {
            // console.error('Error during deserialization:', err); // 에러 로그 추가
            done(err);
        });
    });
    (0, localStrategy_1.default)();
    (0, kakaoStrategy_1.default)();
    (0, naverStrategy_1.default)();
};
