import { Request, Response } from "express";
import Story from "../../../models/Story";
import { Controller } from "../contracts/controller";

export class StoryInitial implements Controller<void>{
    public async handle(req:Request,res:Response){
        try{
            const stories = await Story.find({status:'public'})
              .populate('author')
              .sort({ createdAt:'desc' })
              .lean()
          
            res.render('stories/index',{
                stories
            })
          }catch(err){
              console.log(err)
              res.render('error/500')
          }
    }
}