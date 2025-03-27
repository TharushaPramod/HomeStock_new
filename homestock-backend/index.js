import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './routes/itemrouter.js';
import GLrouter from './routes/grocerylistRoute.js';
import userRouter from './routes/userrouter.js';
import reminderRouters from './routes/reminderrouter.js';

import './geminiService.js';

const app = express();


app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = 'mongodb+srv://sliit:sliit@cluster0.hcm3u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('MongoDB Error:', error);
  }
};

connect();

// Routes
app.use('/api', router);              // Item routes
app.use('/api', userRouter);          // User routes
app.use('/api', reminderRouters);     // Reminder routes
app.use('/api/groceryList', GLrouter); // Grocery list routes

// Server Setup
const port = 3001;
const host = 'localhost';

const server = app.listen(port, host, () => {
  console.log(`Node server is listening to ${server.address().port}`);
});