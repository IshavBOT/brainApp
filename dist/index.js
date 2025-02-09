"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const KEY = process.env.JWT_SECRET;
if (!KEY) {
    throw new Error('JWT_SECRET must be defined in environment variables');
}
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //zod validation and hash the password
    const username = req.body.username;
    const password = req.body.password;
    try {
        yield db_1.UserModel.create({
            username: username,
            password: password
        });
        res.status(200).json({
            message: "You are Signed Up"
        });
    }
    catch (e) {
        res.status(411).json({
            message: "User already exists"
        });
    }
}));
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.UserModel.findOne({
        username: username,
        password: password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, KEY);
        res.json({
            token: token
        });
    }
    else {
        res.status(403).json({
            messgae: "Invalid Credentials"
        });
    }
}));
app.post('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    yield db_1.ContentModel.create({
        link: link,
        type: type,
        tags: [],
        // @ts-ignore
        userId: req.userId
    });
    res.json({
        message: "Content Created"
    });
}));
// @ts-ignore
app.get('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // First verify the userId is being set by middleware
        // @ts-ignore
        if (!req.userId) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }
        // Find content with proper error handling
        const content = yield db_1.ContentModel.find({
            // @ts-ignore
            userId: req.userId
        }).populate({
            path: 'userId',
            select: 'username',
            model: 'User' // Make sure this matches your User model name
        });
        // @ts-ignore
        console.log("User ID from request:", req.userId);
        console.log("Found content:", content);
        res.json({
            success: true,
            content: content
        });
    }
    catch (error) {
        console.error("Error in GET /content:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching content",
            // @ts-ignore
            error: error.message
        });
    }
}));
app.delete('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    // @ts-ignore
    yield db_1.ContentModel.deleteMany({
        contentId,
        // @ts-ignore
        userId: req.userId
    });
    res.json({
        message: "Content Deleted"
    });
}));
app.post('api/v1/brain/share', (req, res) => {
});
app.get('api/v1/brain/:shareLink', (req, res) => {
});
app.listen(3000);
