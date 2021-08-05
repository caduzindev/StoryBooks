import { Request, Response } from "express";
import Story from "../../../models/Story";
import { Controller } from "../contracts/controller";

export class StoryGet implements Controller<void>{
    public async handle(req:Request,res:Response){
        try {
            let story = await Story.findById(req.params.id).lean()
             .populate('author')
             .lean()
     
             if(!story){
                 return res.render('error/404')
             }
             res.render('stories/show',{
                 story
             })
        } catch (error) {
            console.error(error)
            res.render('error/500')
        }
    }
}