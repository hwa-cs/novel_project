"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = __importDefault(require("../models/post"));
exports.afterUploadImage = (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
};
exports.uploadPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //req.body.content, req.body.url 이 프론트에서 넘어온다
    const testtest = req.body.content + "!";
    try {
        // 
        yield post_1.default.create({
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id,
            testcontent: testtest
        });
        const posts = yield post_1.default.findAll({
            attributes: ['content', 'testcontent'],
            where: { userId: req.user.id },
            order: [['createdAt', "DESC"]],
            limit: 10,
        });
        // content와 testcontent 값을 배열로 추출
        const postData = posts.map(post => ({
            content: post.content,
            testcontent: post.testcontent
        }));
        // 결과 반환
        return res.status(200).json({
            success: '작성 되었습니다.',
            posts: postData
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // req.params.id에서 게시물 ID를 가져옵니다.
        const deletePost = yield post_1.default.destroy({
            where: { id: req.params.id }
        });
        // 삭제가 성공적으로 이루어졌는지 확인
        if (deletePost) {
            res.status(200).send('게시물이 삭제되었습니다.');
        }
        else {
            res.status(404).send('게시물이 존재하지 않습니다.');
        }
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
