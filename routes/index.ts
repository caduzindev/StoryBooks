import express from 'express'
import { Auth } from '../middleware/auth'
import DashboardController from '../app/controllers/Dashboard'

const router = express.Router()

router.get('/',Auth.ensureGuest,(req,res)=>{
    res.render('login',{
        layout:'login'
    })
})

router.get('/dashboard',Auth.ensureAuth,DashboardController.DashboardIndex.handle)

export default router;