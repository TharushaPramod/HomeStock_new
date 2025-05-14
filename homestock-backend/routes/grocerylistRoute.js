import express from 'express';
import {
  createList,
  getAllLists,
  getListWithItems,
  deleteList,
  updateList
} from '../controllers/grocerylistController.js';

const router = express.Router();

router.post('/', createList);
router.get('/', getAllLists);
router.get('/:id', getListWithItems);
router.delete('/:id', deleteList);
router.put('/:id', updateList);



export default router;
