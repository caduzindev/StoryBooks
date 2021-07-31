import { model,Schema } from 'mongoose'

export interface User{
    id?:string
    googleId: string;
    displayName:string;
    firstName:string;
    image: string;
    stories?:Array<{type:string,ref:string}>
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
    stories:[
        {
            type:Schema.Types.ObjectId,
            ref:"Story"
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

export default model<User>('User',UserSchema);