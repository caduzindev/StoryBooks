import { Request, Response } from "express";
import { Controller } from "../contracts/controller";
import Story from "../../../models/Story";

export class StoryDelete implements Controller<void>{
    public async handle(req:Request,res:Response){
        try {
            await Story.remove({_id:req.params.id})
            res.redirect('/dashboard')
        } catch (error) {
            console.error(error)
            return res.render('error/500')
        }
    }
}