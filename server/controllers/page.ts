import { RequestHandler } from 'express';
import User from '../models/user';
import Post from '../models/post';
  
//   const renderJoin: RequestHandler = (req, res) => {
//     res.render('join', { title: '회원가입 - Novel' });
//   };

// const renderMain: RequestHandler = async (req, res, next) => {
//     try {
//       const posts = await Post.findAll({
//         include: {
//           model: User,
//           attributes: ['id', 'nick'],
//         },
//         order: [['createdAt', 'DESC']],
//       });
//       res.render('main', {
//         title: 'Novel',
//         twits: posts,
//       });
      
//     } catch (err) {
//       console.error(err);
//       next(err);
//     }
//   }



// export { renderMain, renderJoin };