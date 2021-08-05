import { StoryRenderAdd } from "./StoryRenderAdd";
import { StoryAdd } from './StoryAdd'
import { StoryInitial } from "./StoryInitial";
import { StoryRenderEdit } from './StoryRenderEdit'
import { StoryEdit } from './StoryEdit'
import { StoryDelete } from './StoryDelete'
import { StoryGet } from './StoryGet'
import { StoryOfUser } from './StoryOfUser'

export default {
    StoryRenderAdd:new StoryRenderAdd(),
    StoryAdd:new StoryAdd(),
    StoryInitial: new StoryInitial(),
    StoryRenderEdit: new StoryRenderEdit(),
    StoryEdit:new StoryEdit(),
    StoryDelete: new StoryDelete(),
    StoryGet:new StoryGet(),
    StoryOfUser: new StoryOfUser()
}