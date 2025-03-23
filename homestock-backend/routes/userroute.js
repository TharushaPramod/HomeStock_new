import express from 'express';
import { addUser, deleteUser, getUsers, updateUser } from '../controllers/usercontroller';



const userRouter = express.Router();

router.get('/users', getUsers);
router.post('/user', addUser);
router.post('/updateUser', updateUser);
router.post('/deleteUser', deleteUser);





export default userRouter;