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
exports.userRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const userMiddleware_1 = require("../middleware/userMiddleware");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredBody = zod_1.z.object({
        username: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(3).max(20)
    });
    const parsedBody = requiredBody.parse(req.body);
    const { username, email, password } = parsedBody;
    try {
        const user = yield db_1.userModel.create({
            username,
            email,
            password
        });
        if (!user) {
            res.status(303).json({
                message: "User couldnt be created"
            });
        }
        else {
            res.status(200).json({
                user
            });
        }
    }
    catch (e) {
        res.status(404).json({
            error: e
        });
    }
}));
userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredBody = zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(3).max(20)
    });
    const parsedBody = requiredBody.parse(req.body);
    const { email, password } = parsedBody;
    try {
        const user = yield db_1.userModel.findOne({
            email,
            password
        });
        if (user) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.userSecret);
            res.json({
                message: "Welcome Back " + user.username,
                token
            });
        }
        else {
            res.status(300).json({
                message: "This user does not exist or check your credentials"
            });
            return;
        }
    }
    catch (e) {
        res.status(304).json({
            error: e
        });
    }
}));
userRouter.get('/info', userMiddleware_1.userMiddleware, (req, res) => {
    //@ts-ignore
    const userId = req.id;
    res.json({
        message: "Authorized endpoint reached",
        userId
    });
});
