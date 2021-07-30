import { NextFunction, Request, Response } from "express";

export class Auth{
    constructor(){}

    public static ensureAuth(req:Request,res:Response,next:NextFunction):void{
        if(req.user){
            return next()
        }else{
            res.redirect('/')
        }
    }
    public static ensureGuest(req:Request,res:Response,next:NextFunction):void{
        if(req.user){
            res.redirect('/dashboard')
        }else{
            return next()
        }
    }
}