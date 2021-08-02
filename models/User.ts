import { model,Schema } from 'mongoose'

export interface User{
    _id:string
    id:string
    googleId: string;
    displayName:string;
    firstName:string;
    image: string;
    createdAt: Date;
}

const UserSchema = new Schema<User>({
    googleId:{
        type: String,
        required: true
    },
    displayName:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    image:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

export default model<User>('User',UserSchema);