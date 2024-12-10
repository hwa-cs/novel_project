import passport from 'passport';
import local from './localStrategy';
import kakao from './kakaoStrategy';
import User from '../models/user';
import naver from './naverStrategy';

export default () => {
  passport.serializeUser((user, done) => {
    // 사용자 정보를 세션에 저장
    done(null, user.id); // 세션에 사용자 ID만 저장
  });

  passport.deserializeUser((id, done) => {
    // 세션에서 저장된 사용자 ID로 사용자 정보를 조회
    User.findOne({
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

  local();
  kakao();
  naver();
};
