import express, { Request, Response, RequestHandler } from 'express';
import passport from 'passport';
import axios from 'axios';

import { isLoggedIn, isNotLoggedIn } from '../middlewares';
import { join, login, logout } from '../controllers/auth';

const router = express.Router();

router.post('/join', isNotLoggedIn, join); // 회원가입
router.post('/login', isNotLoggedIn, login); // 로그인
router.get('/logout', isLoggedIn, logout); // 로그아웃

router.get('/kakao', passport.authenticate('kakao')); // 카카오 로그인  패스폴트
router.get('/naver', passport.authenticate('naver'))

router.get(
  '/kakao/callback',
  passport.authenticate('kakao', { failureRedirect: '/?error=카카오로그인 실패' }),
  (req, res) => {
    const user = req.user;
    console.log('카카오 로그인 유저 데이터', user)

    // JWT 토큰 생성 (선택사항)
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: user.snsId, nickname: user.nick, email: user.email, provider: user.provider, accessToken: user.accessToken },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 클라이언트로 리다이렉트 
    res.redirect(`http://localhost:5173/callback?token=${token}&nickname=${user.nick}&email=${user.email}&provider=${user.provider}&id=${user.snsId}&accessToken=${user.accessToken}`);

  }
);

router.get(
  '/naver/callback',
  passport.authenticate('naver', { failureRedirect: '/?error=네이버 로그인 실패' }),
  (req, res) => {
    const user = req.user;
    console.log('네이버 로그인 유저 데이터', user)

    // JWT 토큰 생성 (선택사항)
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: user.id, nickname: user.nick, email: user.email, provider: user.provider, accessToken: user.accessToken },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 클라이언트로 리다이렉트 
    res.redirect(`http://localhost:5173/callback?token=${token}&nickname=${user.nick}&email=${user.email}&provider=${user.provider}&id=${user.snsId}&accessToken=${user.accessToken}`);
  }
);


// 핸들러 타입을 명시적으로 지정
const kakaoLogoutHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const ACCESS_TOKEN = req.user?.accessToken;

    console.log('서버측 엑세스 토큰 :', req.user?.accessToken)
    if (!ACCESS_TOKEN) {
      res.status(400).json({ message: 'Access token not found' });
      return; // 여기서 반환하여 Promise<void>를 보장
    }

    // 카카오 로그아웃 처리
    await axios({
      method: 'post',
      url: 'https://kapi.kakao.com/v1/user/unlink',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    // 비동기 로그아웃
    await new Promise<void>((resolve, reject) => {
      req.logout((err) => {
        if (err) return reject(err);
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
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Logout failed', error });
  }
};

router.get('/kakao/logout', kakaoLogoutHandler);


const naverLogoutHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const ACCESS_TOKEN = req.user?.accessToken;

    console.log('서버측 엑세스 토큰 :', ACCESS_TOKEN);
    if (!ACCESS_TOKEN) {
      res.status(400).json({ message: 'Access token not found' });
      return;
    }

    // 네이버 액세스 토큰 검증 후 세션 로그아웃
    try {
      // 네이버 로그아웃 API 호출 (엔드포인트 확인 필요)
      const response = await axios({
        method: 'get',
        url: 'https://openapi.naver.com/v1/nid/logout',
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      console.log('네이버 로그아웃 응답:', response.data);
    } catch (apiError) {
      console.warn('네이버 로그아웃 API 호출 실패:', apiError);
      // 계속 진행
    }

    // Express의 로그아웃 처리
    await new Promise<void>((resolve, reject) => {
      req.logout((err) => {
        if (err) return reject(err);
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
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Logout failed', error });
  }
};

router.get('/naver/logout', naverLogoutHandler);
export default router;
