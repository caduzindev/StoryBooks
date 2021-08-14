import { Request, Response } from "express";
import { Controller } from "../contracts/controller";
import { StoryServiceInterface } from "../../services/StoryService";

export class StoryDelete implements Controller<void>{
    private service:StoryServiceInterface;
    
    constructor(service:StoryServiceInterface){
        this.service = service
        this.handle = this.handle.bind(this)
    }
    public async handle(req:Request,res:Response){
        try {
            await this.service.remove(req.params.id)
            res.redirect('/dashboard')
        } catch (error) {
            console.error(error)
            return res.render('error/500')
        }
    }
}