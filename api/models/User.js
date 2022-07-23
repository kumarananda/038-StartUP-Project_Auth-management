import mongoose from "mongoose";


const userSchema = mongoose.Schema({

    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique :true,
    },
    cell : {
        type : String,
        required : true,
        unique :true,
        trim : true
    },
    username : {
        type : String,
        required : true,
        unique :true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    age : {
        type : Number,
        required : true,
    },
    gender : {
        type : String,
        required : true,
    },
    photo : {
        type : String,
        default : 'avater.png'
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    status : {
        type : Boolean,
        default : true
    }, 
    trash : {
        type : Boolean,
        default : true
    } 

},
{
    timestamps : true
})


// export Schema
export default mongoose.model('user', userSchema)