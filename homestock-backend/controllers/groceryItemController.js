// controllers/itemController.js
import GroceryItem from '../models/groceryItem.js';

export const addItem = async (req, res) => {
  try {
    const { name, quantity, quantityType, category, status } = req.body;
    const newItem = await GroceryItem.create({
      name,
      quantity,
      quantityType,
      category,
      status: status || 'Pending',
      listId: req.params.listId
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item', error: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const updated = await GroceryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const toggleItemStatus = async (req, res) => {
  try {
    const item = await GroceryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.status = item.status === 'Pending' ? 'Purchased' : 'Pending';
    await item.save();
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    await GroceryItem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
