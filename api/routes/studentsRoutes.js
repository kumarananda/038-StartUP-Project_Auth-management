import express from 'express';
import { createStudent, getAllStudent } from '../controllers/studentController.js';


//init router
const router = express.Router();


router.route('/').get(getAllStudent).post(createStudent)


// export router
export default router;
