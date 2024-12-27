import Post  from "../models/post"
import Cover from "../models/cover"
import axios from "axios"
import fs from 'fs'
import { RequestHandler, NextFunction, Request, Response } from 'express';
import { CustomRequest } from '../types/index';
import sanitizeHtml from 'sanitize-html';


const uploadPost = async(req: CustomRequest, res:Response, next: NextFunction): Promise<void> => {
    //req.body.content, req.body.url 이 프론트에서 넘어온다
    try{
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized: User not found" });
            return;
          }

          
        // req.body.content를 sanitize-html을 이용해 클린징
        if (!req.body.content) {
            res.status(400).json({ error: "Content is required" });
            return;
        }
        
        // sanitize-html을 사용하여 입력값에서 불필요한 HTML 태그나 스크립트를 제거
        const sanitizedContent = sanitizeHtml(req.body.content, {
            allowedTags: [ 'b', 'i', 'em', 'strong', 'p', 'a', 'ul', 'ol', 'li' ],  // 허용할 태그만 지정
            allowedAttributes: {
                '*': [ 'href' ],  // 허용할 속성만 지정
            },
        });

        const prompt = sanitizedContent;  // 클린징된 콘텐츠
        const genre = req.body.genre

        console.log('단락생성 모델 실행중 ~~')
        console.log('프롬프트 :',`${prompt}`)
        console.log('장르 :',`${genre}`)

        const response = await axios({
            method: 'post',
            url: 'http://192.168.1.251:5000/content',
            data: { passage: prompt, genre: genre },
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
            attributes: ['id','content', 'makeContent'],
            where: { userId: req.user.id },
            order: [['createdAt', "DESC"]],
            limit: 10,
        });
        
        // content와 makeContent 값을 배열로 추출
        const postData = posts.map(post => ({
            id: post.id,
            content: post.content,
            makeContent: post.makeContent
        }));
        
        // 결과 반환
        res.status(200).json({
        success: '작성 되었습니다.',
        posts: postData,
        });
        return;
    } catch(error){
        console.error(error)
        next(error)
        // 오류 처리 후 반드시 반환
        res.status(500).json({ error: '서버 오류' });
        return;
    }
    
}

const makeCover = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //req.body.content, req.body.url 이 프론트에서 넘어온다
    // void: 반환값이 없음을 의미합니다. 비동기 함수에서 실제로 반환할 값이 없고, 단지 작업을 수행하기만 하는 경우에 사용됩니다.
    // 사용 예시: 데이터베이스에 기록하거나 API 요청을 보내고, 그 결과에 대해 추가 처리가 필요 없을 때 사용됩니다.
    // 특징: 반환 값이 없기 때문에 후속 작업을 위해 반환된 값을 사용할 수 없습니다.

    if (!req.user) {
        res.status(401).json({ error: "Unauthorized: User not found" });
        return;
      }
      
    // 예시: req.body가 올바르게 정의되었는지 체크
    if (!req.body.content) {
    res.status(400).json({ error: "Content is required" });
    return;
    }

    // sanitize-html을 사용하여 입력값을 클린징
    const sanitizedContent = sanitizeHtml(req.body.content, {
    allowedTags: [ 'b', 'i', 'em', 'strong', 'p', 'a', 'ul', 'ol', 'li' ],  // 허용할 태그
    allowedAttributes: {
        '*': [ 'href' ],  // 허용할 속성
        },
    });

    try{
        // console.log('표지생성 모델 실행중 ~~')
        const prompt = sanitizedContent;  // 클린징된 콘텐츠
        // console.log('프롬프트 :', `${prompt}`)
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

        fs.writeFile(`/Users/hwacheolsu/Desktop/novel_project/client/novel_client/dist/covers/${fileName}`, imageBuffer, (err) => {
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
            attributes: ['id','makeCover'],
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
    } catch(error){
        console.error(error)
        next(error)
        // 오류 처리 후 반드시 반환
        res.status(500).json({ error: '서버 오류' });
        return;
    }
    
}

const update = async(req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        res.status(401).json({ error: "Unauthorized: User not found" });
        return;
      }
    const UserId = req.user.id;
    const contentId = req.body.id
    const Content = req.body.content;
      
    console.log(UserId)
    // console.log('콘텐트id : ',contentId)
    // console.log('콘텐트 : ', Content)
    await Post.update({makeContent:Content},{where:{UserId:UserId, id:contentId}});

    const posts = await Post.findAll({
        attributes: ['id','content', 'makeContent'],
        where: { userId: UserId },
        order: [['createdAt', "DESC"]],
        limit: 10,
    });
    
    // content와 makeContent 값을 배열로 추출
    const postData = posts.map(post => ({
        id: post.id,
        content: post.content,
        makeContent: post.makeContent
    }));
    
    // 결과 반환
    res.status(200).json({
    success: '수정 되었습니다.',
    posts: postData,
    });
    return
  }
const deleteCover = async(req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        res.status(401).json({ error: "Unauthorized: User not found" });
        return;
      }
      
    const id = req.user.id;
    await Cover.destroy({where: {id:2}});
  }

const deleteShort = async(req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        res.status(401).json({ error: "Unauthorized: User not found" });
        return;
      }
    const UserId = req.user.id;
    const contentId = req.body.id
    // console.log('contentId: ', contentId);
    // console.log('userId: ', UserId);
    await Post.destroy({where: {UserId: UserId, id: contentId}})

    const posts = await Post.findAll({
        attributes: ['id','content', 'makeContent'],
        where: { userId: UserId },
        order: [['createdAt', "DESC"]],
        limit: 10,
    });
    
    // content와 makeContent 값을 배열로 추출
    const postData = posts.map(post => ({
        id: post.id,
        content: post.content,
        makeContent: post.makeContent
    }));
    
    // 결과 반환
    res.status(200).json({
    success: '삭제 되었습니다.',
    posts: postData,
    });
    return
  }
export {  uploadPost, makeCover, deleteCover, update, deleteShort}