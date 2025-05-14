import express from 'express';
import{ getReminders, addReminder, updateReminder, deleteReminder, getReminderById } from '../controllers/remindercontroller.js';

const reminderRouters = express.Router();

reminderRouters.get('/getReminders', getReminders);
reminderRouters.post('/addReminder', addReminder);
reminderRouters.put('/updateReminder/:id', updateReminder);
reminderRouters.post('/deleteReminder/:id', deleteReminder);
reminderRouters.get('/getReminders/:id', getReminderById);

export default reminderRouters;
