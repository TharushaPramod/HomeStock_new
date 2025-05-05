import Reminder from '../models/reminder_model.js';

// Fetch all reminders
export const getReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find();
        res.status(200).json(reminders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Add a new reminder
export const addReminder = async (req, res) => {
    try {
        const { id, itemName, currentWeight, thresholdWeight, reminderDate } = req.body;
        const newReminder = new Reminder({ id, itemName, currentWeight, thresholdWeight, reminderDate });
        await newReminder.save();
        res.status(201).json(newReminder);
    } catch (error) {
        res.status(400).json({ message: "Invalid reminder data", error: error.message });
    }
};

// Update an existing reminder
export const updateReminder = async (req, res) => {
    const { id } = req.params;
    const { itemName, currentWeight, thresholdWeight, reminderDate } = req.body;
    try {
        const updatedReminder = await Reminder.updateOne(
            { id: parseInt(id) },
            { $set: { itemName, currentWeight, thresholdWeight, reminderDate } }
        );
        res.status(200).json({ message: "Reminder updated successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error updating reminder", error: error.message });
    }
};

// Delete a reminder
export const deleteReminder = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedReminder = await Reminder.deleteOne({ id: parseInt(id) });
        if (deletedReminder.deletedCount === 0) {
            return res.status(404).json({ message: "Reminder not found" });
        }
        res.status(200).json({ message: "Reminder deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting reminder", error: error.message });
    }
};

// Fetch a reminder by ID
export const getReminderById = async (req, res) => {
    const { id } = req.params;
    try {
        const reminder = await Reminder.findOne({ id: parseInt(id) });
        if (!reminder) {
            return res.status(404).json({ message: "Reminder not found" });
        }
        res.status(200).json(reminder);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};