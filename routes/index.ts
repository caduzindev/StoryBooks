import express from 'express'
import { Auth } from '../middleware/auth'
import { User as UserInterface } from '../models/User'
const router = express.Router()

router.get('/',Auth.ensureGuest,(req,res)=>{
    res.render('login',{
        layout:'login'
    })
})

router.get('/dashboard',Auth.ensureAuth,(req,res)=>{
    const user = <UserInterface>req.user
    res.render('dashboard',{
        name:user.firstName
    })
})

export default router;