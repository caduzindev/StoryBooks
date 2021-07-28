import express from 'express'
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('Login')
})

router.get('/dashboard',(req,res)=>{
    res.send('Dashboard')
})

export default router;