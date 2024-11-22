import express, { Request, Response, RequestHandler } from 'express';
import passport from 'passport';
import axios from 'axios';

import { isLoggedIn, isNotLoggedIn } from '../middlewares';
import { join, login, logout } from '../controllers/auth';

const router = express.Router();

router.post('/join', isNotLoggedIn, join); // 회원가입
router.post('/login', isNotLoggedIn, login); // 로그인
router.get('/logout', isLoggedIn, logout); // 로그아웃

router.get('/kakao', passport.authenticate('kakao'));

router.get(
  '/kakao/callback',
  passport.authenticate('kakao', { failureRedirect: '/?error=카카오로그인 실패' }),
  (req, res) => {
    res.redirect('/api'); // 성공 시 이동
  }
);

// 핸들러 타입을 명시적으로 지정
const kakaoLogoutHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const ACCESS_TOKEN = req.user?.accessToken;
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

export default router;
