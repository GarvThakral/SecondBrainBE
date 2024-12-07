import express from 'express'
import mongoose from 'mongoose'
import { userRouter } from './routes/user';
import { contentRouter } from './routes/content';
import { tagRouter } from './routes/tags';
import cors from 'cors';

const app = express();
app.use(cors());


app.use(express.json());
app.use('/api/v1/user',userRouter);
app.use('/api/v1',contentRouter);
app.use('/api/v1',tagRouter);

async function main():Promise<void>{

    await mongoose.connect('mongodb://localhost:27017/second-brain');
    console.log("Connected to mongoDB database");

    console.log("Listening on port 3000")
    app.listen(3000);

};

main();