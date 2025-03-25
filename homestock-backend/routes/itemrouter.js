import express from 'express';
import { getItems, addItem, updateItem, deleteItem  , getNames , getUseItems , addUseItem , updateUseItem , deleteUseItem } from '../controllers/itemcontroller.js';
import { generateRecipe } from '../controllers/recipeController.js'; // Add this import

const router = express.Router();

router.get('/items', getItems);
router.post('/item', addItem);
router.post('/updateitem', updateItem);
router.post('/deleteitem', deleteItem);
router.get('/getNames', getNames);


router.get('/getUseItems', getUseItems);
router.post('/addUseItem', addUseItem);
router.post('/updateUseItem', updateUseItem);
router.post('/deleteUseItem', deleteUseItem);


// New recipe generation route
router.post('/generate-recipe', generateRecipe);





export default router; 