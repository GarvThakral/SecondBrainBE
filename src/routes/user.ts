import express from 'express';
import { Router } from 'express';
import { userModel } from '../db';
import mongoose from 'mongoose';
import { z } from 'zod';
import Jwt  from 'jsonwebtoken';
import { userSecret } from './config';
import { userMiddleware } from '../middleware/userMiddleware';

const userRouter = Router();

userRouter.post('/signup',async (req,res)=>{
    
    const requiredBody = z.object({
        username:z.string(),
        email:z.string().email(),
        password:z.string().min(3).max(20)
    });
    
    const parsedBody = requiredBody.parse(req.body);
    const { username , email , password } = parsedBody;

    try{
        const user  = await userModel.create({
            username,
            email,
            password    
        });
        if(!user){
            res.status(303).json({
                message:"User couldnt be created"
            });
        }else{
            res.status(200).json({
                user
            });
        }
    }catch(e){
        res.status(404).json({
            error:e
        });
    }
    
});

userRouter.post('/signin',async (req,res)=>{
    const requiredBody = z.object({
        email:z.string().email(),
        password:z.string().min(3).max(20)
    });
    const parsedBody = requiredBody.parse(req.body);
    const { email , password }  = parsedBody;
    try{
        
        const user = await userModel.findOne({
            email,
            password
        });

        if(user){
            const token = Jwt.sign({id:user._id},userSecret);
            const username = user.username;
            res.json({
                message:"Welcome Back "+user.username,
                username,
                token
            })
        }else{
            res.status(300).json({
                message:"This user does not exist or check your credentials" 
            });
            return;
        }
    }catch(e){
        res.status(304).json({
            error:e
        });
    }
})

userRouter.get('/info',userMiddleware,(req,res)=>{
    //@ts-ignore
    const userId = req.id;
    res.json({
        message:"Authorized endpoint reached",
        userId
    });
})

export { userRouter }