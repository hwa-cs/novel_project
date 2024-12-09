import Hashtag  from "../models/hashtag"
import Post  from "../models/post"
import Cover from "../models/cover"
import axios from "axios"
import fs from 'fs'

exports.afterUploadImage = (req, res) => {
    console.log(req.file)
    res.json({ url: `/img/${req.file.filename}` })
}

exports.uploadPost = async(req, res, next) => {
    //req.body.content, req.body.url 이 프론트에서 넘어온다
    try{
        console.log('단락생성 모델 실행중 ~~')
        const prompt = req.body.content
        console.log('프롬프트 :',`${prompt}`)
        const response = await axios({
            method: 'post',
            url: 'http://192.168.1.251:5000/content',
            data: { passage: prompt },
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        console.log('단락생성 모델 종료중 ~~')
        console.log('생성된 단락 : ', response.data.content)
        const makeContent = response.data.content

        await Post.create({
            content : req.body.content,
            UserId: req.user.id,
            makeContent : makeContent
        })
        const posts = await Post.findAll({
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
    } catch(error){
        console.error(error)
        next(error)
    }
    
}

exports.deletePost = async (req, res, next) => {
    try {
        // req.params.id에서 게시물 ID를 가져옵니다.
        const deletePost = await Post.destroy({
            where: { id: req.params.id }
        });

        // 삭제가 성공적으로 이루어졌는지 확인
        if (deletePost) {
            res.status(200).send('게시물이 삭제되었습니다.');
        } else {
            res.status(404).send('게시물이 존재하지 않습니다.');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};


exports.makeCover = async(req, res, next) => {
    //req.body.content, req.body.url 이 프론트에서 넘어온다
    try{
        console.log('표지생성 모델 실행중 ~~')
        const prompt = req.body.content
        console.log('프롬프트 :', `${prompt}`)
        const response = await axios({
            method: 'post',
            url: 'http://192.168.1.251:5000/image',
            data: { passage: prompt },
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        console.log('표지생성 모델 종료중 ~~')
        const makeCover = response.data.image
        // console.log('생성된 표지 데이터 :', makeCover)
        const imageBuffer = Buffer.from(makeCover, 'base64');
        console.log('인코딩된 이미지 파일 :', imageBuffer)
        // 파일로 저장
        const fileName = `${req.user.id}_${Date.now()}.jpg`

        fs.writeFile(`/Users/hwacheolsu/Desktop/novel_project/client/novel_client/public/Images/${fileName}`, imageBuffer, (err) => {
            if (err) {
            console.error('이미지 저장 중 오류 발생:', err);
            } else {
            console.log('이미지가 성공적으로 저장되었습니다');
            }
        });
  
        await Cover.create({
            UserId: req.user.id,
            makeCover : fileName
        })
        
        const Covers = await Cover.findAll({
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
    } catch(error){
        console.error(error)
        next(error)
    }
    
}