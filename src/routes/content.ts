import express from 'express';
import { Router } from 'express';
import { contentModel } from '../db';
import { userMiddleware } from '../middleware/userMiddleware';
import { userRouter } from './user';


const contentRouter = Router();

contentRouter.get('/content',userMiddleware,async (req,res)=>{
    const content = await contentModel.find({
        //@ts-ignore
        userId:req.id
    }).populate('tags')
    res.json({
        content
    })
})
contentRouter.get('/content/:id',userMiddleware,async (req,res)=>{
    const filter = req.params.id;
    const content = await contentModel.find({
        //@ts-ignore
        userId:req.id,
        type:filter
    })
    res.json({
        content
    })
})
contentRouter.post('/content',userMiddleware,async (req,res)=>{

    const { text , link , type , title , tags } = req.body;

    try{
        let date = new Date();
        const day = String(date.getDate()).padStart(2, '0');  
        const month = String(date.getMonth() + 1).padStart(2, '0');  
        const year = String(date.getFullYear()).slice(-2); 

        let newDate = `${day}/${month}/${year}`;
        const contentPost = await contentModel.create({
            text,
            link,
            type,
            title,
            tags,
            //@ts-ignore
            userId:req.id,
            date:newDate
        });
        if(!contentPost){
            res.status(303).json({
                message:"Failed to create post"
            });
        }else{
            res.json({
                contentPost
            });
        }

    }catch(e){
        res.json({
            error:e
        });
    }

    
})
contentRouter.delete('/content',userMiddleware,async (req,res)=>{
    const { contentId } = req.body;
    try{
        const deletedContent = await contentModel.deleteOne({
            _id:contentId,
            //@ts-ignore
            userId:req.id
        })
        console.log(deletedContent)
        if(!deletedContent){
            res.json({
                message:"Post not found"
            })
            return;
        }else{
            res.json({
                message:"Post deleted"
            })
            return;
        }
    }catch(e){
        res.status(304).json({
            e
        })
    }
})
contentRouter.get('/content/:type',userMiddleware,async (req,res)=>{
    //@ts-ignore
    const userId = req.id;
    const type = req.params.type;
    try{
        const content = await contentModel.find({
            type,
            userId
        })
        console.log(content)
        res.json({
            content
        })
    }catch(e){

    }
})

export { contentRouter };