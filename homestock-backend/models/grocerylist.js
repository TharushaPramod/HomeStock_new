import mongoose from "mongoose";
const { Schema } = mongoose;

const grocerylistSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
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

const GroceryList = mongoose.model('GroceryList', grocerylistSchema);
export default GroceryList;
