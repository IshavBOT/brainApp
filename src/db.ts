import mongoose, {model, Model,Schema} from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

const mongoDB = process.env.mongooseURL || '';
if (!mongoDB) {
    throw new Error('MongoDB connection string not found in environment variables');
}
mongoose.connect(mongoDB);

const UserSchema = new Schema({
    username:{type:String, unique:true},
    password:String
})

export const UserModel = model('User',UserSchema)

const ContentSchema = new Schema({
    title:String,
    link:String,
    tags:[{type: mongoose.Types.ObjectId ,ref :'Tag'}],
    userId:{type: mongoose.Types.ObjectId,ref: 'User',required:true}
})

export const ContentModel = model('Content',ContentSchema)