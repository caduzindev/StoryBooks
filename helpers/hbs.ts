import moment from 'moment'
import { Story as StoryInterface } from '../models/Story'
import { User as UserInterface } from '../models/User'

export const formatDate = (date:string,format:string)=>moment(date).format(format)

export const truncate = (str:string,len:number)=>{
    if(str.length > len && str.length > 0){
        let new_str = str + ' '
        new_str = str.substr(0,len)
        new_str = str.substr(0,new_str.lastIndexOf(' '))
        new_str = new_str.length > 0 ? new_str : str.substr(0,len)
        return new_str + '...'
    }
    return str
}

export const stripTags = (data:string)=>{
    console.log(data)
    return data.replace(/<(?:.|\n)*?>/gm,'')
}

export const editIcon = (UserStory:StoryInterface,UserLogged:UserInterface,idStory:string,floating=true)=>{
    if(UserStory._id.toString() === UserLogged._id.toString() ){
        if(floating){
            return `<a href="/stories/edit/${idStory}" class="btn-floating halfway-fab blue"><i class="fas fa-edit"></i></a>`
        }else{
            return `<a href="/stories/edit/${idStory}"><i class="fas fa-edit"></i></a>`
        }
    }else{
        return ''
    }
}

export const select = (selected:string,options:any)=>{
    return options
        .fn(this)
        .replace(
            new RegExp(' value="'+ selected + '"'),
            '$& selected="selected"'
        )
        .replace(
            new RegExp('>'+ selected + '</option>'),
            ' selected="selected"$&'
        )
}