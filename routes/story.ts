import express from 'express'
import { Auth } from '../middleware/auth'
import Story from '../models/Story'
import { User as UserInterface } from '../models/User'

const router = express.Router()

router.get('/add',Auth.ensureAuth,(req,res)=>{
    res.render('stories/add')
})

router.post('/add',Auth.ensureAuth,async (req,res)=>{
    const user = <UserInterface>req.user 
    try{
        await Story.create({...req.body,author:user.id})
        res.redirect('/dashboard')
    }catch(err){
        console.log(err)
        res.render('error/500')
    }
})

export default router;