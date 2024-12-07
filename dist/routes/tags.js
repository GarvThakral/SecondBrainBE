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
exports.tagRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const tagRouter = (0, express_1.Router)();
exports.tagRouter = tagRouter;
tagRouter.get('/tag', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield db_1.tagModel.find();
        if (tags) {
            res.json({
                tags
            });
            return;
        }
        else {
            res.json({
                message: "No tags exists as of now"
            });
            return;
        }
    }
    catch (e) {
        res.status(303).json({
            error: e
        });
    }
}));
tagRouter.post('/tag', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const tag = yield db_1.tagModel.create({
            title
        });
        if (!tag) {
            res.status(303).json({
                message: "The tag already exists"
            });
        }
        else {
            const tagId = tag._id;
            res.json({
                message: "Tag created with id ",
                tagId
            });
        }
    }
    catch (e) {
        res.status(404).json({
            error: e
        });
    }
}));
