import mongoose from "mongoose";
const {Schema} = mongoose;

const ReminderSchema = new Schema({
    id: { type: Number, required: false },
    itemName: { type: String, required: false },
    //currentWeight: { type: Number, required: false },
    reminderWeight: { type: Number, required: false },
    reminderDate: { type: Date, required: false },
    //status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
});

const Reminder = mongoose.model('Reminder', ReminderSchema);

export default Reminder;
