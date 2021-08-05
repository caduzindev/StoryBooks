import { Request, Response } from "express";
import { Controller } from "../contracts/controller";
import { User as UserInterface } from '../../../models/User'
import Story from "../../../models/Story";

export class StoryRenderEdit implements Controller<void>{
    public async handle(req:Request,res:Response){
        try {
            const user = <UserInterface>req.user 
            const story = await Story.findOne({
                _id:req.params.id
            }).lean()
        
            if(!story){
                return res.render('error/404')
            }
            if(story.author != user.id){
                res.redirect('/stories')
            }else{
                res.render('stories/edit',{
                    story
                })
            }
        } catch (error) {
            console.error(error)
            return res.render('error/500')
        }
    }
}