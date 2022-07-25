import createError from "../controllers/createError.js";
import jwt from 'jsonwebtoken';


// check user authenticated or not
const authMedleware = (req, res, next) => {

    try{

        const token = req.cookies.access_token;
    
        // check token 
        if(!token){
            return next(createError(401, "You are not authenticated"))
        }

        // check token authenticated or not
        const tokenCheck = jwt.verify(token, process.env.JWT_SECRET);

        // if token  not authenticated
        if(!tokenCheck){
            return next(createError(401, "Token is Expired"))
        }

        console.log(tokenCheck.id);
        // if token  is authenticated
        if(tokenCheck){
            req.user =  tokenCheck;
            next()
        }
        

        // next();

    }catch(error){
        next(error);
    }

    

    
}

export default authMedleware;