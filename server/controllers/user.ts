import { RequestHandler, Request, Response, NextFunction } from 'express';
import Post from '../models/post';
import Cover from '../models/cover';
import passport from 'passport';



const userData = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', async (authError: Error | null, user: Express.User | false, info: { message: string }) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized: User not found" });
          }

        console.log('유저 유제!! :', req.user.id)

        const id = req.user.id
        // 포스트 데이터 비동기적으로 가져오기
        const posts = await Post.findAll({
        attributes: ['content', 'makeContent'],
        where: { userId: id },
        order: [['createdAt', 'DESC']],
        limit: 10,
        });

        const Covers = await Cover.findAll({
            attributes: ['makeCover'],
            where: { userId: id },
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
        posts: postData,
        covers: Covers,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: '포스트 데이터를 가져오는 중에 오류가 발생했습니다.' });
    }
})(req, res, next)
}; // 미들웨어 내 미들웨어 호출


export default userData