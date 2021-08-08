import { Controller } from "../contracts/controller";
import { Request,Response } from 'express'
import { User as UserInterface } from '../../../models/User'
import Story from "../../../models/Story";

export class DashboardIndex implements Controller<void>{
    public async handle(req:Request,res:Response){
        const user = <UserInterface>req.user

        try{
            const stories = await Story.find({author:user.id}).lean()

            res.render('dashboard',{
                name:user.firstName,
                stories
            })
        }catch(err){
            console.error(err)
            res.render('error/500')
        }
    }
}