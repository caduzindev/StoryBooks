import { join } from 'path'
import dotenv from 'dotenv'
dotenv.config({path:join(__dirname,"config","config.env")})

import express from 'express'
import morgan from 'morgan'
import exphbs from 'express-handlebars'
import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import methodOverride from 'method-override'
import { connectDB } from './config/db'
import routes from './routes'
import routesAuth from './routes/auth'
import routesStory from './routes/story'
import { PassportConfig } from './config/passport'

//helpers
import { formatDate,stripTags,truncate,editIcon,select } from './helpers/hbs'

//config
connectDB()
// Passport
PassportConfig(passport)

const app = express()
// Body Parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Sessions
app.use(session({
    secret:'carlos',
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URI
    })
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(function(req,res,next){
    res.locals.user = req.user || null
    next()
})

// Override
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

//Static folder
app.use(express.static(join(__dirname,"public")))

// View Engine
app.engine('.hbs', exphbs(
    {
        extname:'.hbs',
        defaultLayout:"main",
        helpers:{
            formatDate,
            stripTags,
            truncate,
            editIcon,
            select
        }
    }
));
app.set('view engine', '.hbs');

//logging
if(process.env.NODE_ENV==="development"){
    app.use(morgan('dev'))
}

//Routes
app.use('/',routes)
app.use('/auth',routesAuth)
app.use('/stories',routesStory)
const PORT= process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Servidor iniciado na porta ${PORT}`)
})