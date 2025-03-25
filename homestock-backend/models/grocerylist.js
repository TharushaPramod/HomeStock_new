import mongoose from "mongoose";
const { Schema } = mongoose;

const grocerylistSchema = new Schema({
    id: {
        type: String,
        required: [true, 'ID is required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    status: {
        type: String,
        required: [true, 'Status is required']
    },
});

const GroceryList = mongoose.model('GroceryList', grocerylistSchema);
export default GroceryList;