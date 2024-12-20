"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importStar(require("sequelize"));
const post_1 = __importDefault(require("./post"));
const cover_1 = __importDefault(require("./cover"));
class User extends sequelize_1.default.Model {
    static initiate(sequelize) {
        User.init({
            email: {
                type: sequelize_1.default.STRING(40),
                allowNull: true,
                unique: true,
            },
            nick: {
                type: sequelize_1.default.STRING(15),
                allowNull: false,
            },
            password: {
                type: sequelize_1.default.STRING(100),
                allowNull: true,
            },
            provider: {
                type: sequelize_1.default.ENUM('local', 'kakao', 'naver'),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId: {
                type: sequelize_1.default.STRING(30),
                allowNull: true,
            },
            accessToken: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true, // 카카오 API를 통해 제공되는 값이 없을 수도 있기 때문에 true로 설정
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate() {
        User.hasMany(post_1.default);
        User.hasMany(cover_1.default);
    }
}
;
exports.default = User;
