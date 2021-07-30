import { Strategy } from 'passport-google-oauth20'
import User from '../../models/User'

export default new Strategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},async (accessTok, refreshToken, profile, cb) => {
    const newUser = {
        googleId:profile.id,
        displayName:profile.displayName,
        firstName:profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value
    }

    try {
        let user = await User.findOne({ googleId:newUser.googleId })

        if(user){
            cb(null,user)
        }else{
            user = await User.create(newUser)
            cb(null,user)
        }
    } catch (err) {
        console.error(err)
    }
})