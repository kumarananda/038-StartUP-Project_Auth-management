import Student from "../models/Student.js";
import bcrypt from 'bcryptjs'
import createError from "./createError.js";

/**
 * @access public
 * @route /api/student
 * @method GET 
 */
export const  getAllStudent = async (req, res, next) => {

        
    try{
        const student = await Student.find();

        // if not found data
        if(!student){
            return next(createError(404, "student not found"))
        }
        // if found data
        if(student){
            return res.status(200).json(student);
        }

        // res.status(200).json(student);

    }catch(error){

        //  directly send server error
        next(error)

        //coustomly send error
        // next(createError(404, "coustomly error"))
        
    }
    
}


/**
 * @access public
 * @route /api/student
 * @method post 
 */
export const  createStudent = async (req, res, next) => {

    // make hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt)

    try {
        const createStudent = await Student.create({...req.body, password : hash})
        res.status(200).json(createStudent)
    } catch(error){
        
        //  directly send server error
        next(error)

        //coustomly send error
        // next(createError(404, "coustomly error"))
    }
    
}


/**
 * @access public
 * @route /api/student/id
 * @method GET 
 */
export const  getSingleStudent = async (req, res, next) => {
    const { id } = req.params

    try {
        const singlestudentdata = await Student.findById(id) 

        if(!singlestudentdata){
            return next(createError(404, "Single student not found"));
        }

        if(singlestudentdata){
            res.status(200).json(singlestudentdata)
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
 * @route /api/student/id
 * @method delete 
 */
export const  deleteStudent = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deleted = await Student.findByIdAndDelete(id)

        res.status(200).json({...deleted, msg : "Delete Done"})

    } catch(error){
        
        //  directly send server error
        next(error)

        //coustomly send error
        // next(createError(404, "coustomly error"))
    }

}



/**
 * @access public
 * @route /api/student/id
 * @method put:patch 
 */
export const  editStudent = async (req, res, next) => {
    const { id } = req.params;

    try {
        const singlestudentfind = await Student.findById(id);

        if(!singlestudentfind){
            return next(createError(404, "Single User not found"));
        }

        if(singlestudentfind){
            const updatestudent = await Student.findByIdAndUpdate(id, req.body, {new : true} )
            res.status(200).json(updatestudent)
        }



    } catch(error){
        
        //  directly send server error
        next(error)

        //coustomly send error
        // next(createError(404, "coustomly error"))
    }


}

