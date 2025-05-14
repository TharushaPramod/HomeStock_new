import GroceryList from '../models/groceryList.js';
import GroceryItem from '../models/groceryItem.js';

export const createList = async (req, res) => {
  try {
    const { title, creationDate, shoppingDate, status, priority, notes } = req.body;
    if (!title || !creationDate || !shoppingDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newList = await GroceryList.create({
      title,
      creationDate,
      shoppingDate,
      status,
      priority,
      notes
    });

    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ message: 'Error creating list', error: error.message });
  }
};
// PUT /api/lists/:id
export const updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedList = await GroceryList.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedList) {
      return res.status(404).json({ message: 'List not found' });
    }

    res.status(200).json(updatedList);
  } catch (error) {
    res.status(500).json({ message: 'Error updating list', error: error.message });
  }
};



export const getAllLists = async (req, res) => {
  try {
    const lists = await GroceryList.find();
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lists', error: error.message });
  }
};

export const getListWithItems = async (req, res) => {
  try {
    const list = await GroceryList.findById(req.params.id);
    if (!list) return res.status(404).json({ message: 'List not found' });

    const items = await GroceryItem.find({ listId: list._id });
    
    console.log('List:', list); // Debugging log
    console.log('Items:', items); // Debugging log

    res.status(200).json({ list, items });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching list', error: error.message });
  }
};


export const deleteList = async (req, res) => {
  try {
    await GroceryItem.deleteMany({ listId: req.params.id });
    await GroceryList.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'List and its items deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting list', error: error.message });
  }
};
