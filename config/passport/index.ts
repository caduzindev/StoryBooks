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

// export default {
//     clientID:process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/callback"
// }