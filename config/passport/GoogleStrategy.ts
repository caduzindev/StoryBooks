import { Strategy } from 'passport-google-oauth20'

export default new Strategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},async (accessTok, refreshToken, profile, cb) => {
    
})