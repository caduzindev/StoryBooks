import Story from '../../models/Story'
import { Story as StoryInterface } from '../../models/Story'

export interface StoryServiceInterface{
    add:(story:StoryInterface)=>Promise<void>
}

export class StoryService implements StoryServiceInterface{
    constructor(){}
    public async add(story:StoryInterface){
        await Story.create(story)
    }
}