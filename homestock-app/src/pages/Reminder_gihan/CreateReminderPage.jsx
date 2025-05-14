import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import { Paper } from '@mui/material';
import Footer from '../../components/Footer';

const CreateReminderPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    itemName: '',
    //currentWeight: '',
    reminderWeight: '',
    // reminderDate: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/addReminder', {
        ...formData,
        id: parseInt(formData.id),
        //currentWeight: parseFloat(formData.currentWeight),
        reminderWeight: parseFloat(formData.reminderWeight),
        // reminderDate: new Date(formData.reminderDate)
      });
      navigate('/viewreminder');
    } catch (error) {
      console.error('Error creating reminder:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      id: '',
      itemName: '',
      //currentWeight: '',
      reminderWeight: '',
      // reminderDate: ''
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container p-6 mx-auto mt-16 mb-10">
        <Paper elevation={3} className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-extrabold text-gray-800">Create Reminder</h1>
            <Link
              to="/viewreminder"
              className="px-6 py-2 font-semibold text-white transition duration-200 bg-green-600 rounded-lg shadow-md hover:bg-green-700"
            >
              View Reminders
            </Link>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">ID</label>
              <input
                type="number"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="w-full p-3 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Item Name</label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                className="w-full p-3 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            {/* <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Current Weight</label>
              <input
                type="number"
                name="currentWeight"
                value={formData.currentWeight}
                onChange={handleChange}
                className="w-full p-3 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div> */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Reminder Weight</label>
              <input
                type="number"
                name="reminderWeight"
                value={formData.reminderWeight}
                onChange={handleChange}
                className="w-full p-3 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            {/* <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Reminder Date</label>
              <input
                type="date"
                name="reminderDate"
                value={formData.reminderDate}
                onChange={handleChange}
                className="w-full p-3 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div> */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 font-semibold text-white transition duration-200 bg-green-600 rounded-lg shadow-md hover:bg-green-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 font-semibold text-white transition duration-200 bg-green-600 rounded-lg shadow-md hover:bg-green-700"
              >
                Create Reminder
              </button>
            </div>
          </form>
        </Paper>
      </div>
      <Footer />
    </div>
  );
};

export default CreateReminderPage;