import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import User from '../models/user';

export default () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID!,
        callbackURL: '/api/auth/kakao/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        // accessToken, refreshToken 카카오 api를 사용시 사용
        console.log('profile', profile);
        try {
            const exUser = await User.findOne({
                where: { snsId: profile.id, provider: 'kakao' }
            });
            if (exUser) {
                // 기존 사용자, accessToken 업데이트 필요시 처리
                await exUser.update({ accessToken: accessToken || '' });
                console.log('기존 사용자 :')
                done(null, exUser);
            } else {
                // 새로운 사용자 생성
                const newUser = await User.create({
                    email: profile._json?.kakao_account?.email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                    accessToken: accessToken || ''
                });
                console.log('새로운 사용자 :')
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};
