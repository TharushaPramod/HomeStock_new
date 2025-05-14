import mongoose from 'mongoose';

const GroceryListSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creationDate: { type: Date, required: true },
  shoppingDate: { type: Date, required: true },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Complete'], default: 'Not Started' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  notes: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('GroceryList', GroceryListSchema);
