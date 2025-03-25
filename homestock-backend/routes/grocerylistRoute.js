import express from 'express';
import { getGroceryList, addItemtoGL, updateGroceryList, deleteGroceryList } from '../controllers/grocerylistController.js';

const GLrouter = express.Router();

GLrouter.get('/groceryList', getGroceryList);
GLrouter.get('/addItemGL', addItemtoGL);
GLrouter.get('/updateGroceryList', updateGroceryList);
GLrouter.get('/deleteGroceryList', deleteGroceryList);

export default GLrouter;