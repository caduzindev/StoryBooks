import mongoose from 'mongoose'

export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        })
        console.log(`MongoDB Conectado: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}