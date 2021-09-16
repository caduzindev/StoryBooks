import { Request, Response } from "express";

export interface Controller<T>{
    handle(req:Request,res:Response):T
}