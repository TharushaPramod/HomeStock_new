import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Paper } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/Footer';

const UpdateReminder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    itemName: '',
    //currentWeight: '',
    reminderWeight: '',
    // reminderDate: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReminder();
  }, [id]);

  const fetchReminder = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/getReminders/${id}`);
      const reminder = response.data;
      setFormData({
        id: reminder.id,
        itemName: reminder.itemName,
        //currentWeight: reminder.currentWeight,
        reminderWeight: reminder.reminderWeight,
        // reminderDate: new Date(reminder.reminderDate).toISOString().split('T')[0]
      });
      setError(null);
    } catch (error) {
      console.error('Error fetching reminder:', error);
      setError('Failed to load reminder');
      navigate('/viewreminder');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/updateReminder/${id}`, {
        itemName: formData.itemName,
        //currentWeight: parseFloat(formData.currentWeight),
        reminderWeight: parseFloat(formData.reminderWeight),
        // reminderDate: new Date(formData.reminderDate)
      });
      navigate('/viewreminder');
    } catch (error) {
      console.error('Error updating reminder:', error);
      setError('Failed to update reminder');
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
    navigate('/viewreminder');
  };

  return (
    <div>
      <Navbar />
      <div className="container p-6 mx-auto mt-16 mb-10">
        <Paper elevation={3} className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-extrabold text-gray-800">Update Reminder</h1>
            <Link
              to="/viewreminder"
              className="px-6 py-2 font-semibold text-white transition duration-200 bg-green-600 rounded-lg shadow-md hover:bg-green-700"
            >
              View Reminders
            </Link>
          </div>
          {error && <p className="mb-6 font-medium text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">ID</label>
              <input
                type="number"
                name="id"
                value={formData.id}
                className="w-full p-3 transition duration-200 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
                readOnly
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
                readOnly
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
                Update Reminder
              </button>
            </div>
          </form>
        </Paper>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateReminder;