import Sequelize from 'sequelize';
import configObj from '../config/config';
import User from './user';
import Post from './post';
import Hashtag from './hashtag';
import Cover from './cover';

const env = process.env.NODE_ENV as 'production' | 'test' || 'development';
const config = configObj[env];

const db = {};
const sequelize = new Sequelize.Sequelize(
  config.database, config.username, config.password, config,
);

User.initiate(sequelize);
Post.initiate(sequelize);
Cover.initiate(sequelize);
Hashtag.initiate(sequelize);

User.associate();
Post.associate();
Cover.associate();
Hashtag.associate();

export{ User, Post, Hashtag, Cover, sequelize};