import { Request, Response } from "express";
import { Controller } from "../contracts/controller";
import { User as UserInterface } from '../../../models/User'
import Story from "../../../models/Story";

export class StoryEdit implements Controller<void>{
    public async handle(req:Request,res:Response){
        try {
            const user = <UserInterface>req.user
            let story = await Story.findById(req.params.id).lean()
        
            if(!story){
                res.render('error/404')
            }
            if(story.author != user.id){
                res.redirect('/stories')
            }else{
                story = await Story.findOneAndUpdate({_id:req.params.id},req.body,{
                    new:true,
                    runValidators:true
                })
                res.redirect('/dashboard')
            }
        } catch (error) {
            console.error(error)
            return res.render('error/500')
        }
    }
}