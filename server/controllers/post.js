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
const cover_1 = __importDefault(require("../models/cover"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
exports.afterUploadImage = (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
};
exports.uploadPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //req.body.content, req.body.url 이 프론트에서 넘어온다
    try {
        console.log('단락생성 모델 실행중 ~~');
        const prompt = req.body.content;
        console.log('프롬프트 :', `${prompt}`);
        const response = yield (0, axios_1.default)({
            method: 'post',
            url: 'http://192.168.1.251:5000/content',
            data: { passage: prompt },
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        console.log('단락생성 모델 종료중 ~~');
        console.log('생성된 단락 : ', response.data.content);
        const makeContent = response.data.content;
        yield post_1.default.create({
            content: req.body.content,
            UserId: req.user.id,
            makeContent: makeContent
        });
        const posts = yield post_1.default.findAll({
            attributes: ['content', 'makeContent'],
            where: { userId: req.user.id },
            order: [['createdAt', "DESC"]],
            limit: 10,
        });
        // content와 makeContent 값을 배열로 추출
        const postData = posts.map(post => ({
            content: post.content,
            makeContent: post.makeContent
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
exports.makeCover = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //req.body.content, req.body.url 이 프론트에서 넘어온다
    try {
        console.log('표지생성 모델 실행중 ~~');
        const prompt = req.body.content;
        console.log('프롬프트 :', `${prompt}`);
        const response = yield (0, axios_1.default)({
            method: 'post',
            url: 'http://192.168.1.251:5000/image',
            data: { passage: prompt },
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        console.log('표지생성 모델 종료중 ~~');
        const makeCover = response.data.image;
        // console.log('생성된 표지 데이터 :', makeCover)
        const imageBuffer = Buffer.from(makeCover, 'base64');
        console.log('인코딩된 이미지 파일 :', imageBuffer);
        // 파일로 저장
        const fileName = `${req.user.id}_${Date.now()}.jpg`;
        fs_1.default.writeFile(`/Users/hwacheolsu/Desktop/novel_project/client/novel_client/public/Images/${fileName}`, imageBuffer, (err) => {
            if (err) {
                console.error('이미지 저장 중 오류 발생:', err);
            }
            else {
                console.log('이미지가 성공적으로 저장되었습니다');
            }
        });
        yield cover_1.default.create({
            UserId: req.user.id,
            makeCover: fileName
        });
        const Covers = yield cover_1.default.findAll({
            attributes: ['makeCover'],
            where: { userId: req.user.id },
            order: [['createdAt', "DESC"]],
            limit: 6,
        });
        // 결과 반환
        return res.status(200).json({
            success: '표지 생성 되었습니다.',
            posts: Covers
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
