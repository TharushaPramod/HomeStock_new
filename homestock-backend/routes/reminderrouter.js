import express from 'express';
import{ getReminders, addReminder, updateReminder, deleteReminder } from '../controllers/remindercontroller.js';

const reminderRouters = express.Router();

reminderRouters.get('/getReminders', getReminders);
reminderRouters.post('/addReminder', addReminder);
reminderRouters.post('/updateReminder', updateReminder);
reminderRouters.post('/deleteReminder', deleteReminder);

export default reminderRouters;
