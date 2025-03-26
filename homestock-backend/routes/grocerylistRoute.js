import express from 'express';
import { 
  getGroceryList, 
  addItemtoGL, 
  updateGroceryList, 
  deleteGroceryList,
  getItemById,
} from '../controllers/grocerylistController.js';

const GLrouter = express.Router();

GLrouter.get('/', getGroceryList);
GLrouter.post('/', addItemtoGL);
GLrouter.get('/:id', getItemById); 
GLrouter.put('/:id', updateGroceryList);
GLrouter.delete('/:id', deleteGroceryList);

export default GLrouter;