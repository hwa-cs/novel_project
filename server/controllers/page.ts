import { RequestHandler } from 'express';
import User from '../models/user';
import Post from '../models/post';

const renderProfile: RequestHandler = (req, res) => {
    res.render('profile', { title: '내 정보 - Novel' });
  };
  
  const renderJoin: RequestHandler = (req, res) => {
    res.render('join', { title: '회원가입 - Novel' });
  };

const renderMain: RequestHandler = async (req, res, next) => {
    try {
      const posts = await Post.findAll({
        include: {
          model: User,
          attributes: ['id', 'nick'],
        },
        order: [['createdAt', 'DESC']],
      });
      res.render('main', {
        title: 'Novel',
        twits: posts,
      });
      
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

const renderReserve_1:RequestHandler = (req, res) => {
    res.render('reserve_1', { title: 'reserve_1'})
}

const renderReserve_2:RequestHandler = (req, res) => {
    res.render('reserve_2', { title: 'reserve_2'})}

const renderReserve_3:RequestHandler = (req, res) => {
    res.render('reserve_3', { title: 'reserve_3'})}


export { renderReserve_1, renderReserve_2, renderReserve_3, renderProfile, renderMain, renderJoin };