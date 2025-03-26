import mongoose from 'mongoose';
const { Schema } = mongoose;

const itemSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true 
  },
  name: {
    type: String,
    required: true,
   
  },
  qty: {
    type: Number,
    required: true,
    min: 0
  },
  weight: {
    type: Number,
    required: true,
    min: 0.1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  expireDate: {
    type: Date,
    required: true
  }
});

const Item = mongoose.model('Item', itemSchema);

export default Item;