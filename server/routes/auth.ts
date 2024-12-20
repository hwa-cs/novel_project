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

router.get('/kakao/callback', passport.authenticate('kakao', { failureRedirect: '/?error=카카오로그인 실패' }), async (req, res): Promise<void> => {
  const user = req.user;
  console.log('카카오 로그인 유저',user)

  // user가 존재하는지 확인
  if (!user) {
    res.status(400).json({ message: 'User not found' });
    return; // Promise<void>를 보장
  }

  // 클라이언트로 리다이렉트 
  res.redirect(`https://www.koimang.duckdns.org/callback?nickname=${user.nick}&email=${user.email}&provider=${user.provider}&id=${user.id}&accessToken=${user.accessToken}`);
  return; // 명시적으로 void 반환
});


router.get('/naver/callback', passport.authenticate('naver', { failureRedirect: '/?error=네이버 로그인 실패' }), async (req, res): Promise<void> => {
  const user = req.user;

  // user가 존재하는지 확인
  if (!user) {
    res.status(400).json({ message: 'User not found' });
    return; // Promise<void>를 보장
  }

  // 클라이언트로 리다이렉트 
  res.redirect(`https://www.koimang.duckdns.org/callback?nickname=${user.nick}&email=${user.email}&provider=${user.provider}&id=${user.id}&accessToken=${user.accessToken}`);
  return; // 명시적으로 void 반환
});



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

        // 세션 및 쿠키 삭제
        req.logout((err) => {
          if (err) {
              console.error('로그아웃 처리 실패:', err);
              res.status(500).json({ message: 'Failed to log out' });
              return;
          }

          req.session.destroy((err) => {
              if (err) {
                  console.error('세션 삭제 실패:', err);
                  res.status(500).json({ message: 'Failed to destroy session' });
                  return;
              }

              res.clearCookie('connect.sid', {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: 'none',
                  path: '/',
              });

              res.status(200).json({ message: 'Logout successful' });
          });
      });
  } catch (error) {
      console.error('로그아웃 오류:', error);
      res.status(500).json({ message: 'Logout failed', error });
  }
};

router.get('/naver/logout', naverLogoutHandler);
export default router;
