import {PassportStatic} from 'passport'
import User, { User as UserInterface } from '../../models/User';
import GoogleStrategy from './GoogleStrategy'
 
export const PassportConfig = (passportInstance:PassportStatic)=>{
    passportInstance.use(GoogleStrategy)

    passportInstance.serializeUser((user:UserInterface, done)=>{
        done(null, user.id);
    });
    
    passportInstance.deserializeUser((id, done)=>{
        User.findById(id,(err:Error,user:UserInterface)=>done(err,user))
    });
}