import express from 'express';
import { Request , Response , NextFunction } from 'express';
import Jwt from 'jsonwebtoken';
import { userSecret } from '../routes/config';

export function userMiddleware(req:Request,res:Response,next:NextFunction){
    const token = req.headers.token as string;
    if(!token){
        res.status(303).json({
            message:"No token available"
        });
    }else{
        const decodedInfo = Jwt.verify(token,userSecret);
        if(!decodedInfo){
            res.status(303).json({
                message:"Invalid token"
            });
            return;
        }else{ 
            //@ts-ignore
           req.id = decodedInfo.id;
           next();
        }
    }
}