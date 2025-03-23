import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/itemrouter.js'; 


const app = express();
app.use(cors());

app.use(express.json());

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

const port = 3001;
const host = 'localhost';

const server = app.listen(port, host, () => {
  console.log(`Node server is listening to ${server.address().port}`);
});

app.use('/api', router);
