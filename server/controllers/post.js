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
exports.makeCover = exports.uploadPost = void 0;
const post_1 = __importDefault(require("../models/post"));
const cover_1 = __importDefault(require("../models/cover"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const uploadPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //req.body.content, req.body.url 이 프론트에서 넘어온다
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized: User not found" });
            return;
        }
        // 예시: req.body가 올바르게 정의되었는지 체크
        if (!req.body.content) {
            res.status(400).json({ error: "Content is required" });
            return;
        }
        // 예시: req.body가 올바르게 정의되었는지 체크
        if (!req.body.genre) {
            res.status(400).json({ error: "Genre is required" });
            return;
        }
        const prompt = req.body.content;
        const genre = req.body.genre;
        console.log('단락생성 모델 실행중 ~~');
        console.log('프롬프트 :', `${prompt}`);
        console.log('장르 :', `${genre}`);
        const response = yield (0, axios_1.default)({
            method: 'post',
            url: 'http://192.168.1.251:5000/content',
            data: { passage: prompt, genre: genre },
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
        res.status(200).json({
            success: '작성 되었습니다.',
            posts: postData,
        });
        return;
    }
    catch (error) {
        console.error(error);
        next(error);
        // 오류 처리 후 반드시 반환
        res.status(500).json({ error: '서버 오류' });
        return;
    }
});
exports.uploadPost = uploadPost;
const makeCover = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //req.body.content, req.body.url 이 프론트에서 넘어온다
    // void: 반환값이 없음을 의미합니다. 비동기 함수에서 실제로 반환할 값이 없고, 단지 작업을 수행하기만 하는 경우에 사용됩니다.
    // 사용 예시: 데이터베이스에 기록하거나 API 요청을 보내고, 그 결과에 대해 추가 처리가 필요 없을 때 사용됩니다.
    // 특징: 반환 값이 없기 때문에 후속 작업을 위해 반환된 값을 사용할 수 없습니다.
    console.log('req.user :', req.user);
    console.log('req.body.content :', req.body.content);
    if (!req.user) {
        res.status(401).json({ error: "Unauthorized: User not found" });
        return;
    }
    // 예시: req.body가 올바르게 정의되었는지 체크
    if (!req.body.content) {
        res.status(400).json({ error: "Content is required" });
        return;
    }
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
        fs_1.default.writeFile(`/Users/hwacheolsu/Desktop/novel_project/client/novel_client/dist/covers/${fileName}`, imageBuffer, (err) => {
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
        res.status(200).json({
            success: '표지 생성 되었습니다.',
            posts: Covers
        });
        return;
    }
    catch (error) {
        console.error(error);
        next(error);
        // 오류 처리 후 반드시 반환
        res.status(500).json({ error: '서버 오류' });
        return;
    }
});
exports.makeCover = makeCover;
