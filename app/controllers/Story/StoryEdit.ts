import { Request, Response } from "express";
import { Controller } from "../contracts/controller";
import { User as UserInterface } from '../../../models/User'
import { StoryServiceInterface } from "../../services/StoryService";

export class StoryEdit implements Controller<void>{
    private service:StoryServiceInterface;
    
    constructor(service:StoryServiceInterface){
        this.service = service
        this.handle = this.handle.bind(this)
    }
    public async handle(req:Request,res:Response){
        try {
            const user = <UserInterface>req.user
            const story = await this.service.getOne(req.params.id)
            if(!story){
                res.render('error/404')
            }
            if(story.author != user.id){
                res.redirect('/stories')
            }else{
                await this.service.edit(req.params.id,req.body)
                res.redirect('/dashboard')
            }
        } catch (error) {
            console.error(error)
            return res.render('error/500')
        }
    }
}