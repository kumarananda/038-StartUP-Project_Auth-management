import express from 'express';
import { createUser, deleteUser, editUser, getAllUser, getSingleUser, userLogin, userRegister } from '../controllers/userController.js';
import adminMeddleware from '../middlewares/adminMeddleware.js';
import authMedleware from '../middlewares/authMeddleware.js';
import userMeddleware from '../middlewares/userMeddleware.js';


//init router
const router = express.Router();

// Routs for Rest API 
router.route('/').get(adminMeddleware, getAllUser).post(adminMeddleware, createUser);
router.route('/:id').get(userMeddleware, getSingleUser).delete(userMeddleware, deleteUser)
  .put(userMeddleware, editUser).patch(userMeddleware, editUser);

// user Auth route
router.post('/login', userLogin)
router.post('/register', userRegister)

// export router
export default router;
