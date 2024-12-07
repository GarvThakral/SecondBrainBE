"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = userMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../routes/config");
function userMiddleware(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        res.status(303).json({
            message: "No token available"
        });
    }
    else {
        const decodedInfo = jsonwebtoken_1.default.verify(token, config_1.userSecret);
        if (!decodedInfo) {
            res.status(303).json({
                message: "Invalid token"
            });
            return;
        }
        else {
            //@ts-ignore
            req.id = decodedInfo.id;
            next();
        }
    }
}
