import GoogleOAuth from 'passport-google-oauth20'

const GoogleStrategy = GoogleOAuth.Strategy

export default new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},function name(params:any) {
    console.log('jasdjsdjksld')
})