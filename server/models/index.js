"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.Cover = exports.Post = exports.User = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const config_1 = __importDefault(require("../config/config"));
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const post_1 = __importDefault(require("./post"));
exports.Post = post_1.default;
const cover_1 = __importDefault(require("./cover"));
exports.Cover = cover_1.default;
const env = process.env.NODE_ENV || 'development';
const config = config_1.default[env];
const db = {};
const sequelize = new sequelize_1.default.Sequelize(config.database, config.username, config.password, config);
exports.sequelize = sequelize;
user_1.default.initiate(sequelize);
post_1.default.initiate(sequelize);
cover_1.default.initiate(sequelize);
user_1.default.associate();
post_1.default.associate();
cover_1.default.associate();
