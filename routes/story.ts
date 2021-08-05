import express from 'express'
import StoryController from '../app/controllers/Story'
import { Auth } from '../middleware/auth'

const router = express.Router()

router.get('/add',Auth.ensureAuth,StoryController.StoryRenderAdd.handle)

router.post('/add',Auth.ensureAuth,StoryController.StoryAdd.handle)

router.get('/',StoryController.StoryInitial.handle)

router.get('/edit/:id',Auth.ensureAuth,StoryController.StoryRenderEdit.handle)

router.put('/:id',Auth.ensureAuth,StoryController.StoryEdit.handle)

router.delete('/:id',Auth.ensureAuth,StoryController.StoryDelete.handle)

router.get('/:id',Auth.ensureAuth,StoryController.StoryGet.handle)

router.get('/user/:userId',Auth.ensureAuth,StoryController.StoryOfUser.handle)

export default router;