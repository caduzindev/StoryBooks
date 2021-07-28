import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'

//config
dotenv.config({path:"./config/config.env"})
connectDB()

const app = express()

const PORT= process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Servidor iniciado na porta ${PORT}`)
})