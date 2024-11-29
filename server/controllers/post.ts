import Hashtag  from "../models/hashtag"
import Post  from "../models/post"

exports.afterUploadImage = (req, res) => {
    console.log(req.file)
    res.json({ url: `/img/${req.file.filename}` })
}

exports.uploadPost = async(req, res, next) => {
    //req.body.content, req.body.url 이 프론트에서 넘어온다
    const testtest = req.body.content + "!"
    try{
        // 
        await Post.create({
            content : req.body.content,
            img: req.body.url,
            UserId: req.user.id,
            testcontent : testtest
        })
        const posts = await Post.findAll({
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
