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
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const userMiddleware_1 = require("../middleware/userMiddleware");
const contentRouter = (0, express_1.Router)();
exports.contentRouter = contentRouter;
contentRouter.get('/content', userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield db_1.contentModel.find({
        //@ts-ignore
        userId: req.id
    }).populate('tags');
    res.json({
        content
    });
}));
contentRouter.get('/content/:id', userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.params.id;
    const content = yield db_1.contentModel.find({
        //@ts-ignore
        userId: req.id,
        type: filter
    });
    res.json({
        content
    });
}));
contentRouter.post('/content', userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, link, type, title, tags } = req.body;
    try {
        let date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        let newDate = `${day}/${month}/${year}`;
        const contentPost = yield db_1.contentModel.create({
            text,
            link,
            type,
            title,
            tags,
            //@ts-ignore
            userId: req.id,
            date: newDate
        });
        if (!contentPost) {
            res.status(303).json({
                message: "Failed to create post"
            });
        }
        else {
            res.json({
                contentPost
            });
        }
    }
    catch (e) {
        res.json({
            error: e
        });
    }
}));
contentRouter.delete('/content', userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    try {
        const deletedContent = yield db_1.contentModel.deleteOne({
            _id: contentId,
            //@ts-ignore
            userId: req.id
        });
        console.log(deletedContent);
        if (!deletedContent) {
            res.json({
                message: "Post not found"
            });
            return;
        }
        else {
            res.json({
                message: "Post deleted"
            });
            return;
        }
    }
    catch (e) {
        res.status(304).json({
            e
        });
    }
}));
