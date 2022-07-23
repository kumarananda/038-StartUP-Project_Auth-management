import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import createError from "./createError.js";

/**
 * @access public
 * @route /api/user
 * @method GET 
 */
export const  getAllUser = async (req, res, next) => {

        
    try{
        const user = await User.find();

        // if not found data
        if(!user){
            return next(createError(404, "Single User not found"))
        }
        // if found data
        if(user){
            res.status(200).json(user);
        }

        res.status(200).json(user);

    }catch(error){

        //  directly send server error
        next(error)

        //coustomly send error
        // next(createError(404, "coustomly error"))
        
    }
    
}


/**
 * @access public
 * @route /api/user
 * @method post 
 */
export const  createUser = async (req, res, next) => {

    // make hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt)

    try {
        const createUser = await User.create({...req.body, password : hash})
        res.status(200).json(createUser)
    } catch(error){
        
        //  directly send server error
        next(error)

        //coustomly send error
        // next(createError(404, "coustomly error"))
    }
    
}


/**
 * @access public
 * @route /api/user/:id
 * @method GET 
 */
export const  getSingleUser = async (req, res, next) => {
    const { id } = req.params
 
    try {
        const user = await User.findById(id) 

        if(!user){
            return next(createError(404, "Single User not found"));
        }
        if(user){
            res.status(200).json(user)
        }


    } catch(error){
        
        //  directly send server error
        next(error)

        //coustomly send error
        // next(createError(404, "coustomly error"))
    }
    
}


/**
 * @access public
 * @route /api/user/id
 * @method delete 
 */
export const  deleteUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        const datafind = await User.findById(id);
        if(!datafind){
            return next(createError(404, "User not found"));
        }
        if(datafind){
            const deleted = await User.findByIdAndDelete(id)
            res.status(200).json({...deleted, msg : "Delete Done"})
        }
        

    } catch(error){
        
        //  directly send server error
        next(error)

        //coustomly send error
        // next(createError(404, "coustomly error"))
    }

}



/**
 * @access public
 * @route /api/user/:id
 * @method put:patch 
 */
export const  editUser = async (req, res, next) => {
    const { id } = req.params;

    try {

        const datafind = await User.findById(id);

        console.log(datafind);
        res.status(200).json(datafind)

        // if(!datafind){
        //     return next(createError(404, "User not found"));
        // }

        // if(datafind){

        //     const updateUser = await User.findByIdAndUpdate(id, req.body, {new : true} )
        //     res.status(200).json(updateUser)
        // }



    } catch(error){
        
        //  directly send server error
        next(error)

        //coustomly send error
        // next(createError(404, "coustomly error"))
    }


}

