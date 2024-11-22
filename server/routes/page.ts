import express from 'express';
import { renderProfile, renderJoin, renderMain, renderReserve_1, renderReserve_2, renderReserve_3 } from'../controllers/page';

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
    // res.locals는 미들웨어간 공유되는 데이터
    // req.session는 로그아욷 전까지 사용자들 끼리 공유된는 데이터
    next();
  });
  
router.get('/profile', renderProfile);
// 프로필
router.get('/join', renderJoin);
// 회원가입
router.get('/', renderMain);
// 메인 페이지


router.get('/reserve_1', renderReserve_1);
router.get('/reserve_2', renderReserve_2);
router.get('/reserve_3', renderReserve_3);


export default router;