"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const user_1 = __importDefault(require("./user"));
class Cover extends sequelize_1.default.Model {
    static initiate(sequelize) {
        Cover.init({
            makeCover: {
                type: sequelize_1.default.STRING(50),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Cover',
            tableName: 'covers',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate() {
        Cover.belongsTo(user_1.default);
    }
}
exports.default = Cover;
