import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
const app = express()
app.use(express.json())
import dotenv from 'dotenv';
dotenv.config();
import { ContentModel, UserModel } from './db'
import { userMiddleware } from './middleware'

const KEY = process.env.JWT_SECRET
if (!KEY) {
    throw new Error('JWT_SECRET must be defined in environment variables')
}

app.post('/api/v1/signup', async (req, res) => {

    //zod validation and hash the password
    const username = req.body.username
    const password = req.body.password

    try {
        await UserModel.create({
            username: username,
            password: password
        })

        res.status(200).json({
            message: "You are Signed Up"
        })
    } catch (e) {
        res.status(411).json({
            message: "User already exists"
        })
    }

})

app.post('/api/v1/signin', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const existingUser =await UserModel.findOne({
        username:username,
        password:password
    })

    if(existingUser){
        const token = jwt.sign({
            id:existingUser._id
        }, KEY)

        res.json({
            token:token
        })
    }
    else{
        res.status(403).json({
            messgae:"Invalid Credentials"
        })
    }

})

app.post('/api/v1/content',userMiddleware, async(req, res) => {
    const link = req.body.link
    const type = req.body.type
    await ContentModel.create({
        link:link,
        type:type,
        tags:[],
        // @ts-ignore
        userId: req.userId
    })
    res.json({
        message:"Content Created"
    })

})

// @ts-ignore
app.get('/api/v1/content', userMiddleware, async (req, res) => {
    try {
        // First verify the userId is being set by middleware
        // @ts-ignore
        if (!req.userId) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        // Find content with proper error handling
        const content = await ContentModel.find({
            // @ts-ignore
            userId: req.userId
        }).populate({
            path: 'userId',
            select: 'username',
            model: 'User'  // Make sure this matches your User model name
        });
        // @ts-ignore
        console.log("User ID from request:", req.userId);
        console.log("Found content:", content);
        
        res.json({
            success: true,
            content: content
        });
    } catch (error) {
        console.error("Error in GET /content:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching content",
            // @ts-ignore
            error: error.message
        });
    }
});

app.delete('/api/v1/content',userMiddleware, async (req, res) => {
    const contentId = req.body.contentId
    // @ts-ignore
    await ContentModel.deleteMany({
        contentId,
        // @ts-ignore
        userId:req.userId
    })

    res.json({
        message:"Content Deleted"
    })
})

app.post('api/v1/brain/share', (req, res) => {
    
})

app.get('api/v1/brain/:shareLink', (req, res) => {
    
})

app.listen(3000)
