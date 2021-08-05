import { Request, Response } from "express";
import { Controller } from "../contracts/controller";

export class StoryRenderAdd implements Controller<void>{
    constructor(){}
    public handle(req:Request,res:Response){
        res.render('stories/add')
    }
}