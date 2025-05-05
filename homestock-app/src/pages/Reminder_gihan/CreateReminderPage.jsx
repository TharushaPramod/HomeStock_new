import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const CreateReminderPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    itemName: '',
    currentWeight: '',
    thresholdWeight: '',
    reminderDate: ''
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
        currentWeight: parseFloat(formData.currentWeight),
        thresholdWeight: parseFloat(formData.thresholdWeight),
        reminderDate: new Date(formData.reminderDate)
      });
      navigate('/viewreminder');
    } catch (error) {
      console.error('Error creating reminder:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Reminder</h1>
      <Link to="/viewreminder" className="text-blue-500 mb-4 inline-block">View Reminders</Link>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">ID</label>
          <input
            type="number"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>
        <div>
          <label className="block">Item Name</label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>
        <div>
          <label className="block">Current Weight</label>
          <input
            type="number"
            name="currentWeight"
            value={formData.currentWeight}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>
        <div>
          <label className="block">Threshold Weight</label>
          <input
            type="number"
            name="thresholdWeight"
            value={formData.thresholdWeight}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>
        <div>
          <label className="block">Reminder Date</label>
          <input
            type="date"
            name="reminderDate"
            value={formData.reminderDate}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Reminder
        </button>
      </form>
    </div>
  );
};

export default CreateReminderPage;