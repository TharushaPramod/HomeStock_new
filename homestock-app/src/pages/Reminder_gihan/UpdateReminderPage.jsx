import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const UpdateReminder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    itemName: '',
    currentWeight: '',
    thresholdWeight: '',
    reminderDate: ''
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
        currentWeight: reminder.currentWeight,
        thresholdWeight: reminder.thresholdWeight,
        reminderDate: new Date(reminder.reminderDate).toISOString().split('T')[0]
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
        currentWeight: parseFloat(formData.currentWeight),
        thresholdWeight: parseFloat(formData.thresholdWeight),
        reminderDate: new Date(formData.reminderDate)
      });
      navigate('/viewreminder');
    } catch (error) {
      console.error('Error updating reminder:', error);
      setError('Failed to update reminder');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Reminder</h1>
      <Link to="/viewreminder" className="text-blue-500 mb-4 inline-block">View Reminders</Link>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">ID</label>
          <input
            type="number"
            name="id"
            value={formData.id}
            className="w-full border p-2"
            readOnly
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
          Update Reminder
        </button>
      </form>
    </div>
  );
};

export default UpdateReminder;