import { model,Schema } from 'mongoose'

export interface Story{
    _id?:string
    title:string
    body:string
    status:string
    author:string
    createdAt:Date
}

const StorySchema = new Schema<Story>({
    title:{
        type: String,
        required: true,
        trim:true
    },
    body:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'public',
        enum:['public','private']
    },
    author:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

export default model<Story>('Story',StorySchema);