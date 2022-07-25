// import { Express } from "express";
import  express  from "express";
import colors from "colors";
import dotenv from 'dotenv';
import studentRoutes from './routes/studentsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import mongoDBConnect from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

// express init
const app = express()
dotenv.config()


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(cookieParser());


// env variabels
const PORT = process.env.SERVER_PORT || 5000



// routes
app.use('/api/students', studentRoutes);
app.use('/api/user', userRoutes);

// error handler
app.use(errorHandler)

// listen server
app.listen(PORT, () => {
    // mongoDB init
    mongoDBConnect()
    console.log(`server running on port ${PORT}` .bgGreen.black);
})
