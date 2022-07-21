// import { Express } from "express";
import  express  from "express";
import colors from "colors";
import dotenv from 'dotenv';
import studentRoutes from './routes/studentsRoutes.js'

// express init
const app = express()
dotenv.config()

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended : false}))



// env variabels
const PORT = process.env.SERVER_PORT || 5000

// routes
app.use('/api/students', studentRoutes)

// listen server
app.listen(PORT, () => {
    console.log(`sevver running on port ${PORT}` .bgGreen.black);
})
