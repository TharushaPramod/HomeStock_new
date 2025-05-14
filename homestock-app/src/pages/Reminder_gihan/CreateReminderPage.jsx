import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import { Select, MenuItem, FormControl } from '@mui/material';
import Footer from '../../components/Footer';

const CreateReminderPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    itemName: '',
    reminderWeight: '',
  });
  const [itemNames, setItemNames] = useState([]);

  useEffect(() => {
    const fetchItemNames = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getNames');
        setItemNames(response.data.itemNames || []);
      } catch (error) {
        console.error('Error fetching item names:', error);
      }
    };
    fetchItemNames();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/addReminder', {
        ...formData,
        id: parseInt(formData.id),
        reminderWeight: parseFloat(formData.reminderWeight),
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
      reminderWeight: '',
    });
    navigate('/viewreminder');
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl px-6 py-10 mx-auto">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Create Reminder</h1>
            <Link
              to="/viewreminder"
              className="px-4 py-2 text-white transition-colors bg-green-600 rounded-md shadow-sm hover:bg-green-700"
            >
              View Reminders
            </Link>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">ID</label>
              <input
                type="number"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">Item Name</label>
              <FormControl fullWidth required>
                <Select
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  className="h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <MenuItem value="">
                    <em>Select an item</em>
                  </MenuItem>
                  {itemNames.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">Reminder Weight</label>
              <input
                type="number"
                name="reminderWeight"
                value={formData.reminderWeight}
                onChange={handleChange}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm text-white transition-colors bg-green-600 rounded-md hover:bg-green-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white transition-colors bg-green-600 rounded-md hover:bg-green-700"
              >
                Create Reminder
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateReminderPage;