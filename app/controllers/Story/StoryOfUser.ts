import { Request, Response } from "express";
import Story from "../../../models/Story";
import { Controller } from "../contracts/controller";

export class StoryOfUser implements Controller<void>{
    public async handle(req:Request,res:Response){
        try {
            const stories = await Story.find({
                author:req.params.userId,
                status:'public'
            }).populate('author').lean()
            
            res.render('stories/index',{
                stories
            })
        } catch (error) {
            console.error(error)
            res.render('error/500')
        }
    }
}