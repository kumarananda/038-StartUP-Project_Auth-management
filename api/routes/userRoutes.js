import express from 'express';
import { createUser, deleteUser, editUser, getAllUser, getSingleUser } from '../controllers/userController.js';


//init router
const router = express.Router();


router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(getSingleUser).delete(deleteUser).put(editUser).patch(editUser);


// export router
export default router;
