import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node"
import { clerkWebHooks } from './controllers/webhooks.js'
// Intialize Express Instance
const app = express()

// Connect to Database 

await connectDB()

// Middleware 
app.use(cors())

//To Parse Data in JSON
app.use(express.json())

// Port 
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app)

//Connection Method
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

//Route
app.get('/',(req,res)=>res.send("API Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks',clerkWebHooks)


//Connecting TO SERVER
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`); 
})