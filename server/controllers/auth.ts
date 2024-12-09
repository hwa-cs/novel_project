import bcrypt from 'bcrypt';
import passport from 'passport';
import User from '../models/user';
import Post from '../models/post';
import Cover from '../models/cover';
import { RequestHandler } from 'express';

const join: RequestHandler = async (req, res, next) => {
  const { email, nick, password } = req.body;

  // 입력 데이터 유효성 검사
  if (!email || !nick || !password) {
    return res.status(400).json({ error: '모든 필드를 입력해주세요.' });
  }

  try {
    // 이미 존재하는 사용자 확인
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.status(409).json({ error: '이미 가입된 이메일입니다.' });
    }

    // 비밀번호 해시 생성
    const hash = await bcrypt.hash(password, 12);

    // 새로운 사용자 생성
    await User.create({
      email,
      nick,
      password: hash,
    });

    return res.status(201).json({ success: '회원가입이 성공적으로 완료되었습니다.' });
  } catch (error) {
    console.error('회원가입 중 에러 발생:', error);
    return res.status(500).json({ error: '서버 에러가 발생했습니다. 다시 시도해주세요.' });
  }
};


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
const login: RequestHandler = async (req, res, next) => {
  passport.authenticate('local', async (authError: Error | null, user: Express.User | false, info: { message: string }) => {
    if (authError) {
      console.error(authError);
      return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
    if (!user) {
      return res.status(401).json({ error: "존재하지 않는 계정입니다. "}); // JSON 형식의 에러 응답
    }
    // 로그인 성공 시 user 객체에 로그인 진행
    return req.login(user, async (loginError) => {
      if (loginError) {
        console.error(loginError);
        return res.status(500).json({ error: '로그인 과정에서 오류가 발생했습니다.' });
      }

      try {
        // 사용자 정보 추출
        const data = { 'id': user.id, 'email': user.email, 'nick': user.nick, 'provider': user.provider};

        // 포스트 데이터 비동기적으로 가져오기
        const posts = await Post.findAll({
          attributes: ['content', 'makeContent'],
          where: { userId: user.id },
          order: [['createdAt', 'DESC']],
          limit: 10,
        });
        
        const Covers = await Cover.findAll({
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

      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: '포스트 데이터를 가져오는 중에 오류가 발생했습니다.' });
      }
    });
  })(req, res, next); // 미들웨어 내 미들웨어 호출
};

const logout:RequestHandler = (req, res) => {
  req.logout(() => {
    res.redirect('/api');
  });
};

export { logout, login, join }