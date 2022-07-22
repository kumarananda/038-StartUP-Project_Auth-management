import mongoose from "mongoose";




// create a mongoDB connection
const mongoDBConnect = async() => {

    try {

        const connect = await mongoose.connect(process.env.MONGO_STRING);
        console.log(`mongonDB connection set successfully HOST : ${ connect.connection.host }`.yellow);

    } catch (error) {
        console.log(error);
    }


    
}

export default mongoDBConnect;