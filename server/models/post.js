"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const user_1 = __importDefault(require("./user"));
const hashtag_1 = __importDefault(require("./hashtag"));
class Post extends sequelize_1.default.Model {
    static initiate(sequelize) {
        Post.init({
            content: {
                type: sequelize_1.default.STRING(700),
                allowNull: true,
            },
            makeContent: {
                type: sequelize_1.default.TEXT,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate() {
        Post.belongsTo(user_1.default);
        Post.belongsToMany(hashtag_1.default, { through: 'PostHashtag' });
        // as, foreignkey 미작성은 햇갈릴 염려 없어서 생략 가능
    }
}
exports.default = Post;
