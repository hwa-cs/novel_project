import express from 'express';
import fs from 'fs';
import { uploadPost, makeCover, update, deleteShort, deleteCover } from '../controllers/post';
import {isLoggedIn} from '../middlewares';

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

// POST /post
router.post('/', isLoggedIn, uploadPost);

router.post('/cover', isLoggedIn, makeCover)

router.post('/update', isLoggedIn, update)

router.post('/deleteShort', isLoggedIn, deleteShort)

router.post('/deleteCover', isLoggedIn, deleteCover)

export default router;
