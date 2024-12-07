"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.tagModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const userSchema = new mongoose_2.Schema({
    username: { type: String, unique: true },
    email: String,
    password: String
});
const contentSchema = new mongoose_2.Schema({
    text: String,
    link: String,
    type: String,
    title: String,
    tags: [{ type: mongoose_2.Types.ObjectId, ref: 'tags' }],
    userId: { type: mongoose_2.Types.ObjectId, ref: 'Users' },
    date: String
});
const tagSchema = new mongoose_2.Schema({
    title: { type: String, unique: true }
});
const linkSchema = new mongoose_2.Schema({
    hash: String,
    userId: { type: mongoose_2.Types.ObjectId, ref: 'Users' }
});
const userModel = mongoose_1.default.model('Users', userSchema);
exports.userModel = userModel;
const contentModel = mongoose_1.default.model('content', contentSchema);
exports.contentModel = contentModel;
const tagModel = mongoose_1.default.model('tags', tagSchema);
exports.tagModel = tagModel;
const linkModel = mongoose_1.default.model('links', linkSchema);
exports.linkModel = linkModel;
