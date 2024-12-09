"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
// import { isLoggedIn } from'../middlewares'
// import { loginCheck } from'../controllers/user'
const router = express_1.default.Router();
router.post('/Data', user_1.default); // 로그인
exports.default = router;
