import dotenv from 'dotenv';
dotenv.config()
import express from 'express'
import propertyRouter from "../backend/property/propertyRoute.js"



const app = express()
const PORT = process.env.PORT

app.use('/api', propertyRouter)


app.listen(PORT,()=>{
    console.log(`Running on PORT ${PORT}`)
})