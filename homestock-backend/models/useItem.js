import mongoose from 'mongoose';
const { Schema } = mongoose;

const useItemSchema = new Schema({
  useId: {
    type: Number,
  },
  useName: {
    type: String,
    
  },
  useWeight: {
    type: Number,
    
  }
});

const Item = mongoose.model('useItem', useItemSchema);

export default Item; // Use ES Modules export