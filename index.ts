import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
console.log("MONGODB_URL from .env:", process.env.MONGODB_URL);
import express from 'express'
import mongoose from 'mongoose'
import { userRouter } from './src/routes/user';
import { contentRouter } from './src/routes/content';
import { tagRouter } from './src/routes/tags';
import cors from 'cors';

const app = express();
app.use(cors());


app.use(express.json());
app.use('/api/v1/user',userRouter);
app.use('/api/v1',contentRouter);
app.use('/api/v1',tagRouter);

async function main():Promise<void>{
    const mongoURL = process.env.MONGODB_URL;
    if (!mongoURL) {
        throw new Error("MONGODB_URL environment variable is not set");
    }
    await mongoose.connect(mongoURL);
    console.log("Connected to mongoDB database");

    console.log("Listening on port 3000")
    app.listen(3000);

};

main();