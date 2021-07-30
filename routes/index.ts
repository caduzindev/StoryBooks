import express from 'express'
import { Auth } from '../middleware/auth'
const router = express.Router()

router.get('/',Auth.ensureGuest,(req,res)=>{
    res.render('login',{
        layout:'login'
    })
})

router.get('/dashboard',Auth.ensureAuth,(req,res)=>{
    res.render('dashboard')
})

export default router;