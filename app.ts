import { join } from 'path'
import dotenv from 'dotenv'
dotenv.config({path:join(__dirname,"config","config.env")})

import express from 'express'
import morgan from 'morgan'
import exphbs from 'express-handlebars'
import passport from 'passport'
import session from 'express-session'
import { connectDB } from './config/db'
import routes from './routes'
import routesAuth from './routes/auth'
import { PassportConfig } from './config/passport'

//config
connectDB()
// Passport
PassportConfig(passport)

const app = express()

// Sessions
app.use(session({
    secret:'carlos',
    resave:false,
    saveUninitialized:false,
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Static folder
app.use(express.static(join(__dirname,"public")))

// View Engine
app.engine('.hbs', exphbs({extname:'.hbs',defaultLayout:"main"}));
app.set('view engine', '.hbs');

//logging
if(process.env.NODE_ENV==="development"){
    app.use(morgan('dev'))
}

//Routes
app.use('/',routes)
app.use('/auth',routesAuth)
const PORT= process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Servidor iniciado na porta ${PORT}`)
})