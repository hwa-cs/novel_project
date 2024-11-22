import bcrypt from 'bcrypt';
import passport from 'passport';
import User from '../models/user';
import { RequestHandler } from 'express';

const join: RequestHandler = async (req, res, next) => {
   const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/api/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/api');
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

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
const login: RequestHandler = (req, res, next) => {
  passport.authenticate('local', (authError: Error | null, user: Express.User | false, info: { message: string }) => {
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
const logout:RequestHandler = (req, res) => {
  req.logout(() => {
    res.redirect('/api');
  });
};

export { logout, login, join }