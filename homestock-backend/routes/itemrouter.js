import express from 'express';
import { getItems, addItem, updateItem, deleteItem } from '../controllers/itemcontroller.js';

const router = express.Router();

router.get('/items', getItems);
router.post('/item', addItem);
router.post('/updateitem', updateItem);
router.post('/deleteitem', deleteItem);

export default router; 