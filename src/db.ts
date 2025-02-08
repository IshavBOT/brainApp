import mongoose, {model, Model,Schema} from 'mongoose'
mongoose.connect('mongodb+srv://manavishav:29L9jbAQNF9X7IOO@ishav.slndu.mongodb.net/brain')

const UserSchema = new Schema({
    username:{type:String, unique:true},
    password:String
})

export const UserModel = model('User',UserSchema)
