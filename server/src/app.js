import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import { corsOrigin } from './config/appConfig.js'
import mainRouter from './routes/main.router.js'
import errorHandler from './utils/errorHandler.js';

const app = express()



// middlewares -----
app.use(cors({
    origin: corsOrigin,
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}))
app.use(express.json({ limit:'100mb'}))
app.use(express.urlencoded({ extended: false, }))
app.use(cookieParser())
app.use(express.static("public"))



// routes ------

app.use('/api/v1/restaurant' ,  mainRouter)


// global error handler ------

app.use(errorHandler);


export default app