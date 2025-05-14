import mongoose from 'mongoose';
const { Schema } = mongoose;

const useItemSchema = new Schema({
  useId: {
    type: Number,
    required: true,
    unique: true 
  },
  useName: {
    type: String,
    required: true
  },
  useType: {
    type: String,
    required: true
  },
  useWeight: {
    type: Number,
    required: true
  }
});

const UseItem = mongoose.model('UseItem', useItemSchema);

export default UseItem;