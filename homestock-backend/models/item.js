import mongoose from 'mongoose';
const { Schema } = mongoose;

const itemSchema = new Schema({
  id: {
    type: Number,
    
   
  },
  name: {
    type: String,
    
  },
  qty: {
    type: Number,
    
  },
  weight: {
    type: Number,
    
  },
  price: {
    type: Number,
   
  },
  expireDate: {
    type: Date,
    
  },
});

const Item = mongoose.model('Item', itemSchema);

export default Item; // Use ES Modules export