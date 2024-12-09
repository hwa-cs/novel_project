import passport from 'passport';
import local from './localStrategy';
import kakao from './kakaoStrategy';
import User from '../models/user';
import naver from './naverStrategy'

export default () => {
  passport.serializeUser((user, done) => {
    // console.log('시리얼라이즈 유저', user); // user는 tokenUser다.
    // 로그인 시, 사용자 데이터를 세션에 저장하는데
    // done(null, {id : user.id, accessToken : user.accessToken});
    done(null, user.id);
  });
  
  
  passport.deserializeUser((id, done) => {
    // console.log('Deserializing user with id:', id); // 로그 추가
    User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['id', 'nick'],
          as: 'Followers',
        },
        {
          model: User,
          attributes: ['id', 'nick'],
          as: 'Followings',
        },
      ],
    })
      .then((user) => {
        // console.log('User found during deserialization:', user); // 로그 추가
        done(null, user); // req.user 설정
      })
      .catch((err) => {
        // console.error('Error during deserialization:', err); // 에러 로그 추가
        done(err);
      });
  });
  

  local();
  kakao();
  naver()
};