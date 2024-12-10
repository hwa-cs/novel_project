import passport from 'passport';
import { Strategy as NaverStrategy } from 'passport-naver';
import User from '../models/user';

export default () => {
    passport.use(new NaverStrategy({
        clientID: process.env.NAVER_ID!,
        clientSecret: process.env.NAVER_SECRET,
        callbackURL: process.env.NAVER_CALLBACK!,
    }, async (accessToken, refreshToken, profile, done) => {

        console.log('profile', profile);
        try {
            const exUser = await User.findOne({
                where: { email: profile._json.email, provider: 'naver' }
            });
            console.log('exUser', exUser);
            console.log(profile._json.email)
            if (exUser) {
                // 기존 사용자, accessToken 업데이트 필요시 처리
                await exUser.update({ accessToken: accessToken || '' });
                console.log('기존 사용자 :')
                done(null, exUser);
            } else {
                // 새로운 사용자 생성
                const newUser = await User.create({
                    name: profile.displayName,
                    email: profile.emails?.[0].value,
                    nick: profile.displayName,
                    provider: 'naver',
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
