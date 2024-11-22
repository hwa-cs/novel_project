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
const join = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, nick, password } = req.body;
    try {
        const exUser = yield user_1.default.findOne({ where: { email } });
        if (exUser) {
            return res.redirect('/api/join?error=exist');
        }
        const hash = yield bcrypt_1.default.hash(password, 12);
        yield user_1.default.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/api');
    }
    catch (error) {
        console.error(error);
        return next(error);
    }
});
exports.join = join;
// const login: RequestHandler = (req, res, next) => {
//   passport.authenticate('local', (authError: Error | null, user: Express.User | false, info: { message: string }) => {
//   if (authError) {
//     console.error(authError);
//     return next(authError);
//   }
//   if (!user) {
//     return res.redirect(`/api/?error=${info.message}`);
//   }
//   return req.login(user, (loginError) => {
//     if (loginError) {
//       console.error(loginError);
//       return next(loginError);
//     }
//     return res.redirect('/api');
//   });
// })(req, res, next);
//  // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
// };
const login = (req, res, next) => {
    passport_1.default.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
        }
        if (!user) {
            return res.status(401).json({ error: info.message }); // JSON 형식의 에러 응답
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return res.status(500).json({ error: '로그인 과정에서 오류가 발생했습니다.' });
            }
            return res.status(200).json({ message: '로그인 성공', user }); // JSON 형식의 성공 응답
        });
    })(req, res, next); // 미들웨어 내 미들웨어 호출
};
exports.login = login;
const logout = (req, res) => {
    req.logout(() => {
        res.redirect('/api');
    });
};
exports.logout = logout;
