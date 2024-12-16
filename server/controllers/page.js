"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderJoin = exports.renderMain = void 0;
const user_1 = __importDefault(require("../models/user"));
const post_1 = __importDefault(require("../models/post"));
const renderJoin = (req, res) => {
    res.render('join', { title: '회원가입 - Novel' });
};
exports.renderJoin = renderJoin;
const renderMain = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.default.findAll({
            include: {
                model: user_1.default,
                attributes: ['id', 'nick'],
            },
            order: [['createdAt', 'DESC']],
        });
        res.render('main', {
            title: 'Novel',
            twits: posts,
        });
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});
exports.renderMain = renderMain;
