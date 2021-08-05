import { Request, Response } from "express";
import Story from "../../../models/Story";
import {User as UserInterface} from "../../../models/User"
import { Controller } from "../contracts/controller";

export class StoryAdd implements Controller<void>{
    public async handle(req:Request,res:Response){
        const user = <UserInterface>req.user 
        try{
            await Story.create({...req.body,author:user.id})
            res.redirect('/dashboard')
        }catch(err){
            console.log(err)
            res.render('error/500')
        }
    }
}