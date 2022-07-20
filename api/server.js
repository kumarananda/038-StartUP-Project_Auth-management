// import { Express } from "express";
import  express  from "express";
import colors from "colors"
import dotenv from 'dotenv'


// express init
const app = express()
dotenv.config()

// env variabels
const PORT = process.env.SERVER_PORT || 5000



// listen server
app.listen(PORT, () => {
    console.log(`sevver running on port ${PORT}` .bgGreen.black);
})
