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
        // 사용자 정보를 세션에 저장
        done(null, user.id); // 세션에 사용자 ID만 저장
    });
    passport_1.default.deserializeUser((id, done) => {
        // 세션에서 저장된 사용자 ID로 사용자 정보를 조회
        user_1.default.findOne({
            where: { id },
        })
            .then((user) => {
            if (!user) {
                return done(new Error('User not found'));
            }
            done(null, user); // req.user에 사용자 정보 저장
        })
            .catch((err) => {
            done(err);
        });
    });
    (0, localStrategy_1.default)();
    (0, kakaoStrategy_1.default)();
    (0, naverStrategy_1.default)();
};
