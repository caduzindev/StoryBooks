import express from 'express'
import StoryController from '../app/controllers/Story'
import { Auth } from '../middleware/auth'
import Story from '../models/Story'
import { User as UserInterface } from '../models/User'

const router = express.Router()

router.get('/add',Auth.ensureAuth,StoryController.StoryRenderAdd.handle)

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
    try {
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
    } catch (error) {
        console.error(error)
        return res.render('error/500')
    }
})

router.put('/:id',Auth.ensureAuth,async (req,res)=>{
    try {
        const user = <UserInterface>req.user
        let story = await Story.findById(req.params.id).lean()
    
        if(!story){
            res.render('error/404')
        }
        if(story.author != user.id){
            res.redirect('/stories')
        }else{
            story = await Story.findOneAndUpdate({_id:req.params.id},req.body,{
                new:true,
                runValidators:true
            })
            res.redirect('/dashboard')
        }
    } catch (error) {
        console.error(error)
        return res.render('error/500')
    }
})

router.delete('/:id',Auth.ensureAuth,async (req,res)=>{
    try {
        await Story.remove({_id:req.params.id})
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error)
        return res.render('error/500')
    }
})

router.get('/:id',Auth.ensureAuth,async (req,res)=>{
   try {
       let story = await Story.findById(req.params.id).lean()
        .populate('author')
        .lean()

        if(!story){
            return res.render('error/404')
        }
        res.render('stories/show',{
            story
        })
   } catch (error) {
       console.error(error)
       res.render('error/500')
   }
})

router.get('/user/:userId',Auth.ensureAuth,async (req,res)=>{
    try {
        const stories = await Story.find({
            author:req.params.userId,
            status:'public'
        }).populate('author').lean()
        
        res.render('stories/index',{
            stories
        })
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})
export default router;