import Story from '../../models/Story'
import { Story as StoryInterface } from '../../models/Story'

export interface StoryServiceInterface{
    add:(story:StoryInterface)=>Promise<void>
    remove:(id:string)=>Promise<void>
    getOne:(id:string)=>Promise<StoryInterface>
    edit:(idStory:string,body:StoryInterface)=>Promise<void>
}

export class StoryService implements StoryServiceInterface{
    constructor(){}
    public async add(story:StoryInterface){
        await Story.create(story)
    }
    public async remove(id:string){
        await Story.remove({_id:id})
    }
    public async getOne(id:string){
        return await Story.findById(id).lean()
    }
    public async edit(idStory:string,body:StoryInterface){
        await Story.findOneAndUpdate({_id:idStory},body,{
            new:true,
            runValidators:true
        })
    }
}