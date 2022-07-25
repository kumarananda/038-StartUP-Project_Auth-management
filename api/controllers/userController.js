import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import createError from "./createError.js";
import jwt from 'jsonwebtoken'

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
            // res.status(200).json("Data found")
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

        // console.log(datafind);
        // res.status(200).json(datafind)

        if(!datafind){
            return next(createError(404, "User not found"));
        }

        if(datafind){

            const updateUser = await User.findByIdAndUpdate(id, req.body, {new : true} )
            res.status(200).json(updateUser)
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
 * @route /api/user/login
 * @method post 
 */
 export const  userLogin = async (req, res, next) => {

    // get body data
    const { data, email, username} = req.body;

    try {


        // // find user by email , username, cell any type of data 02
        let login_user = null;
        const login_useremail = await User.findOne({email : data});
        if(login_useremail){
            login_user = login_useremail
        }else {
            const login_username = await User.findOne({username : data});
            if(login_username){
                login_user = login_username;
            }else{
                const login_usercell = await User.findOne({cell : data});
                login_user = login_usercell;
            }
        }

        {
        // // find user by email , username, cell any type of data 01

        // const login_useremail = await User.findOne({email : data});
        // const login_username = await User.findOne({username : data});
        // const login_usercell = await User.findOne({cell : data});
        
        // const login_user = login_useremail ? login_useremail : (login_username ? login_username : login_usercell );
        

        
        // // find user 
        // let login_user = await User.findOne({email});
             
        // if(!login_user){
        //     const login_username = await User.findOne({username});
        //     login_user = login_username 
        // }

        // // find user 
        // const login_useremail = await User.findOne({email});
        // const login_username = await User.findOne({username});
        // const login_user = login_useremail ? login_useremail : login_username;
        }


        // apply on user not found
        if(!login_user){

            return next(createError(404, "user not found"))          
        }

        // check password
        const passwordCheck = await bcrypt.compare(req.body.password, login_user.password);
        // handle password
        if( !passwordCheck){
            return next(createError(404, "Password not match"))
        }

        // https://generate.plus/en/base64
        // create json web token ( {user_ID }, our_secret , {expiry/validity})
        const token = jwt.sign( {id : login_user._id, isAdmin : login_user.isAdmin },  process.env.JWT_SECRET , { expiresIn : "2d" });

        // login user info >> skiping _id, password, isAdmin and  "_doc" hare for Extra added data when skiping
        const { _id, password, isAdmin, ...login_info } =login_user._doc;
        
         res.cookie("access_token", token).status(200).json({
            token : token,
            user : login_info
         })

    } catch (error){

        next(error)
    }


}

/**
 * @access public
 * @route /api/user/register
 * @method post 
 */
 export const  userRegister = async (req, res, next) => {

    

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
