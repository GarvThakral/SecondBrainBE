import mongoose from 'mongoose';
import { Schema , Types } from 'mongoose';

const userSchema = new Schema({
    username:{ type:String , unique:true },
    email:String,
    password:String
});

const contentSchema = new Schema({
    text:String,
    link:String,
    type:String,
    title:String,
    tags: [{ type: Types.ObjectId, ref: 'tags' }],
    userId:{ type:Types.ObjectId , ref:'Users'},
    date:String
});

const tagSchema = new Schema({
    title:{ type:String , unique:true }
});

const linkSchema = new Schema({
    hash:String,
    userId:{ type:Types.ObjectId , ref:'Users'}
});

const userModel = mongoose.model('Users',userSchema);
const contentModel = mongoose.model('content',contentSchema);
const tagModel = mongoose.model('tags',tagSchema);
const linkModel = mongoose.model('links',linkSchema);

export { userModel , contentModel , tagModel , linkModel };