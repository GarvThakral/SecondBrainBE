import express from 'express';
import mongoose from 'mongoose';
import { Router } from 'express';
import { tagModel } from '../db';
const tagRouter = Router();

tagRouter.get('/tag',async (req,res)=>{
    try{
        const tags = await tagModel.find();
        if(tags){
            res.json({
                tags
            });
            return;
        }else{
            res.json({
                message:"No tags exists as of now"
            });
            return;
        }
    }catch(e){
        res.status(303).json({
            error:e
        });
    }   
})

tagRouter.post('/tag',async (req,res)=>{
    const { title } = req.body;

    try{
        const tag = await tagModel.create({
            title
        })
        if(!tag){
            res.status(303).json({
                message:"The tag already exists"
            });
        }else{
            const tagId = tag._id; 
            res.json({
                message:"Tag created with id ",
                tagId
            });
        }
    }catch(e){
        res.status(404).json({
            error:e
        });
    }
})

export {tagRouter};