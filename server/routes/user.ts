import express from'express'
import userData from '../controllers/user';
// import { isLoggedIn } from'../middlewares'
// import { loginCheck } from'../controllers/user'
const router = express.Router()

router.post('/Data', userData); // 로그인

export default router