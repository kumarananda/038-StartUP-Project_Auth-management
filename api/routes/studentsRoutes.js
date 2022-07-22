import express from 'express';
import { createStudent, deleteStudent, editStudent, getAllStudent, getSingleStudent } from '../controllers/studentController.js';


//init router
const router = express.Router();


router.route('/').get(getAllStudent).post(createStudent);
router.route('/:id').get(getSingleStudent).delete(deleteStudent).put(editStudent).patch(editStudent);


// export router
export default router;
