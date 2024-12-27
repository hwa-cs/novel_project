"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const post_1 = require("../controllers/post");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
try {
    fs_1.default.readdirSync('uploads');
}
catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs_1.default.mkdirSync('uploads');
}
// POST /post
router.post('/', middlewares_1.isLoggedIn, post_1.uploadPost);
router.post('/cover', middlewares_1.isLoggedIn, post_1.makeCover);
router.post('/update', middlewares_1.isLoggedIn, post_1.update);
router.post('/deleteShort', middlewares_1.isLoggedIn, post_1.deleteShort);
router.post('/deleteCover', middlewares_1.isLoggedIn, post_1.deleteCover);
exports.default = router;
