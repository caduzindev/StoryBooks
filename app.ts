import { join } from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import exphbs from 'express-handlebars'
import passport from 'passport'
import session from 'express-session'
import { connectDB } from './config/db'
import routes from './routes'

//config
dotenv.config({path:"./config/config.env"})
connectDB()

// Passport

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

const PORT= process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Servidor iniciado na porta ${PORT}`)
})