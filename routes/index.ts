import express from 'express'
import { Auth } from '../middleware/auth'
import User, { User as UserInterface } from '../models/User'
const router = express.Router()

router.get('/',Auth.ensureGuest,(req,res)=>{
    res.render('login',{
        layout:'login'
    })
})

router.get('/dashboard',Auth.ensureAuth,async (req,res)=>{
    const user = <UserInterface>req.user

    try{
        const stories = await User.findById(user.id).populate('stories').lean()
        res.render('dashboard',{
            name:user.firstName,
            stories
        })
    }catch(err){
        console.error(err)
        res.render('error/500')
    }
})

export default router;