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
const passport_1 = __importDefault(require("passport"));
const passport_kakao_1 = require("passport-kakao");
const user_1 = __importDefault(require("../models/user"));
exports.default = () => {
    passport_1.default.use(new passport_kakao_1.Strategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/api/auth/kakao/callback'
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        // accessToken, refreshToken 카카오 api를 사용시 사용
        console.log('profile', profile);
        try {
            const exUser = yield user_1.default.findOne({
                where: { snsId: profile.id, provider: 'kakao' }
            });
            if (exUser) {
                // 기존 사용자, accessToken 업데이트 필요시 처리
                yield exUser.update({ accessToken: accessToken || '' });
                console.log('기존 사용자 :');
                done(null, exUser);
            }
            else {
                // 새로운 사용자 생성
                const newUser = yield user_1.default.create({
                    email: (_b = (_a = profile._json) === null || _a === void 0 ? void 0 : _a.kakao_account) === null || _b === void 0 ? void 0 : _b.email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                    accessToken: accessToken || ''
                });
                console.log('새로운 사용자 :');
                done(null, newUser);
            }
        }
        catch (error) {
            console.error(error);
            done(error);
        }
    })));
};
