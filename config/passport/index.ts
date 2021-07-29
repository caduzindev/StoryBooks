import {PassportStatic} from 'passport'
import GoogleStrategy from './GoogleStrategy'

export const PassportConfig = (passportInstance:PassportStatic)=>{
    passportInstance.use(GoogleStrategy)
}

// export default {
//     clientID:process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/callback"
// }