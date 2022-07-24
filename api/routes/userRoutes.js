import express from 'express';
import { createUser, deleteUser, editUser, getAllUser, getSingleUser } from '../controllers/userController.js';


//init router
const router = express.Router();

// Routs for Rest API 
router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(getSingleUser).delete(deleteUser).put(editUser).patch(editUser);

// user Auth route
// router.post('/login', userLogin)
// router.post('/register', userRegister)

// export router
export default router;
