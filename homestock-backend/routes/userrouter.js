import express from 'express';
import { addUser, deleteUser, getUsers, updateUser } from '../controllers/usercontroller.js';




const userRouter = express.Router();

userRouter.get('/users', getUsers);
userRouter.post('/user', addUser);
userRouter.post('/updateUser', updateUser);
userRouter.post('/deleteUser', deleteUser);





export default userRouter;
