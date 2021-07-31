import express from 'express'
import { Auth } from '../middleware/auth'

const router = express.Router()

router.get('/add',Auth.ensureAuth,(req,res)=>{
    res.render('stories/add')
})

export default router;