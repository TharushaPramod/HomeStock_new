import mongoose from 'mongoose';
const { Schema } = mongoose;

const itemSchema = new Schema({
  id: {
    type: Number,
    required: [true, 'ID is required'], 
    unique: true, 
  },
  name: {
    type: String,
    required: [true, 'Name is required'] 
  },
  qty: {
    type: Number,
    required: [true, 'Name is required'] 
  },
  weight: {
    type: Number,
    required: [true, 'weight is required'] 
  },
  price: {
    type: Number,
    required: [true, 'Price is required'] 
  },
  expireDate: {
    type: Date,
    required: [true, 'Date is required'] 
  },
});

const Item = mongoose.model('Item', itemSchema);

export default Item; // Use ES Modules export