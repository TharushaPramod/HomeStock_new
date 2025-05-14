import mongoose from "mongoose";

const GroceryItemSchema = new mongoose.Schema({
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroceryList',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  quantityType: {
    type: String,
    required: true,
    enum: ['pcs', 'kg', 'liters', 'packs', 'bottles', 'grams', 'ml']
  },
  category: {
    type: String,
    required: true,
    enum: ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery', 'Other']
  },
  status: {
    type: String,
    enum: ['Pending', 'Purchased'],
    default: 'Pending'
  }
}, { timestamps: true });

const GroceryItem = mongoose.model("GroceryItem", GroceryItemSchema);
export default GroceryItem;
