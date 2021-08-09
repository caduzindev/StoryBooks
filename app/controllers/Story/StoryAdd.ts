import { Request, Response } from "express";
import {User as UserInterface} from "../../../models/User"
import { StoryServiceInterface } from "../../services/StoryService";
import { Controller } from "../contracts/controller";

export class StoryAdd implements Controller<void>{
    private service:StoryServiceInterface;
    
    constructor(service:StoryServiceInterface){
        this.service = service
        this.handle = this.handle.bind(this)
    }
    public async handle(req:Request,res:Response){
        const user = <UserInterface>req.user
        try{
            await this.service.add({...req.body,author:user.id})
            res.redirect('/dashboard')
        }catch(err){
            console.error(err)
            res.render('error/500')
        }
    }
}