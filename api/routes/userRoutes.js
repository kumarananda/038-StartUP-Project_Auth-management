import express from 'express';
import { createUser, deleteUser, editUser, getAllUser, getSingleUser, userLogin, userRegister } from '../controllers/userController.js';
import authMedleware from '../middlewares/authMeddleware.js';


//init router
const router = express.Router();

// Routs for Rest API 
router.route('/').get(authMedleware, getAllUser).post(authMedleware, createUser);
router.route('/:id').get(authMedleware, getSingleUser).delete(authMedleware, deleteUser)
  .put(authMedleware, editUser).patch(authMedleware, editUser);

// user Auth route
router.post('/login', userLogin)
router.post('/register', userRegister)

// export router
export default router;
