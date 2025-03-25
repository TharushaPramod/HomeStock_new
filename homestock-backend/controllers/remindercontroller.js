import Reminder from '../models/reminder_model.js';


// @desc    Get all reminders
// @route   GET /api/reminders
export const getReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find();
        res.status(200).json(reminders);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// export const getReminders = (req, res, next) => {
//     Reminder.find()
//         .then(response => {
//             res.json({ response });
//         })
//         .catch(error => {
//             res.json({ error: error });
//         });
// };

// @desc    Add a new reminder
// @route   POST /api/reminders
export const addReminder = async (req, res) => {
    try {
        const { id, itemName, currentWeight, thresholdWeight, reminderDate } = req.body;
        const newReminder = new Reminder({ id, itemName, currentWeight, thresholdWeight, reminderDate });
        await newReminder.save();
        res.status(201).json(newReminder);
    } catch (error) {
        res.status(400).json({ message: "Invalid reminder data" });
    }
};

// export const addReminder = (req, res, next) => {
//     const user = new Reminder({
//         id: req.body.id,
//         itemName: req.body.itemName,
//         currentWeight: req.body.currentWeight,
//         thresholdWeight: req.body.thresholdWeight,
//         reminderDate: req.body.reminderDate,
//         confirmPassword: req.body.confirmPassword,

//     });
//     user.save()
//         .then(response => {
//             res.json({ response });
//         })
//         .catch(error => {
//             res.json({ error: error });
//         });
// };

// @desc    Update a reminder
// @route   PUT /api/reminders/:id
// export const updateReminder = async (req, res) => {
//     try {
//         const updatedReminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedReminder) return res.status(404).json({ message: "Reminder not found" });
//         res.status(200).json(updatedReminder);
//     } catch (error) {
//         res.status(500).json({ message: "Update failed" });
//     }
// };

export const updateReminder = (req, res, next) => {
    const { id, itemName, currentWeight, thresholdWeight, reminderDate } = req.body;
    Reminder.updateOne({ id: id },
        { $set: { itemName: itemName, currentWeight: currentWeight, thresholdWeight: thresholdWeight, reminderDate: reminderDate } }
    )
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error: error });
        });
};

// @desc    Delete a reminder
// @route   DELETE /api/reminders/:id
// export const deleteReminder = async (req, res) => {
//     try {
//         const deletedReminder = await Reminder.findByIdAndDelete(req.params.id);
//         if (!deletedReminder) return res.status(404).json({ message: "Reminder not found" });
//         res.status(200).json({ message: "Reminder deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Deletion failed" });
//     }
// };

export const deleteReminder = (req, res, next) => {
    const id = req.body.id;
    Reminder.deleteOne({ id: id })
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error: error });
        });
};


