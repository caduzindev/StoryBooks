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

router.get('/',async (req,res)=>{
    try{
      const stories = await Story.find({status:'public'})
        .populate('author')
        .sort({ createdAt:'desc' })
        .lean()
    
      res.render('stories/index',{
          stories
      })
    }catch(err){
        console.log(err)
        res.render('error/500')
    }
})

router.get('/edit/:id',Auth.ensureAuth,async (req,res)=>{
    const user = <UserInterface>req.user 
    const story = await Story.findOne({
        _id:req.params.id
    }).lean()

    if(!story){
        return res.render('error/404')
    }
    if(story.author != user.id){
        res.redirect('/stories')
    }else{
        res.render('stories/edit',{
            story
        })
    }
})

router.put('/:id',Auth.ensureAuth,async (req,res)=>{
    const user = <UserInterface>req.user
    let story = await Story.findById(req.params.id)

    if(!story){
        res.render('error/404')
    }
    if(story.author != user.id){
        res.redirect('/stories')
    }else{
        res.render('stories/edit',{
            story
        })
    }
})

export default router;