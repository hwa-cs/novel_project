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
const passport_naver_1 = require("passport-naver");
const user_1 = __importDefault(require("../models/user"));
exports.default = () => {
    passport_1.default.use(new passport_naver_1.Strategy({
        clientID: process.env.NAVER_ID,
        clientSecret: process.env.NAVER_SECRET,
        callbackURL: process.env.NAVER_CALLBACK,
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('profile', profile);
        try {
            const exUser = yield user_1.default.findOne({
                where: { email: profile._json.email, provider: 'naver' }
            });
            console.log('exUser', exUser);
            console.log(profile._json.email);
            if (exUser) {
                // 기존 사용자, accessToken 업데이트 필요시 처리
                yield exUser.update({ accessToken: accessToken || '' });
                console.log('기존 사용자 :');
                done(null, exUser);
            }
            else {
                // 새로운 사용자 생성
                const newUser = yield user_1.default.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    nick: profile.displayName,
                    provider: 'naver',
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
