import express from 'express';
import {
  addItem,
  updateItem,
  toggleItemStatus,
  deleteItem
} from '../controllers/groceryItemController.js';

const router = express.Router();

router.post('/:listId', addItem);
router.put('/:id', updateItem);
router.patch('/:id/toggle', toggleItemStatus);
router.delete('/:id', deleteItem);

export default router;
