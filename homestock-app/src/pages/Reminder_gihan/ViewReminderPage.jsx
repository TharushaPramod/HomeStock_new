import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ViewReminderPage = () => {
  const [reminders, setReminders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/getReminders');
      setReminders(response.data);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`http://localhost:3001/api/deleteReminder/${id}`);
      fetchReminders();
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const isValidDate = (date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  };

  const filteredReminders = reminders
    .filter((reminder) =>
      reminder.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((reminder) => {
      if (!selectedDate) return true;
      if (!isValidDate(reminder.reminderDate)) return false;
      const reminderDate = new Date(reminder.reminderDate).toISOString().split('T')[0];
      return reminderDate === selectedDate;
    });

  const generateReport = () => {
    if (!selectedDate) {
      alert('Please select a date to generate report.');
      return;
    }

    const selected = new Date(selectedDate);
    const reportReminders = reminders.filter((r) => {
      if (!isValidDate(r.reminderDate)) return false;
      const rDate = new Date(r.reminderDate).toISOString().split('T')[0];
      return rDate === selectedDate;
    });

    if (reportReminders.length === 0) {
      alert('No reminders found for the selected date.');
      return;
    }

    const doc = new jsPDF();

    // Important: Ensure 'autoTable' is properly invoked
    const tableColumn = ['ID', 'Item Name', 'Current Weight', 'Threshold Weight', 'Reminder Date'];
    const tableRows = reportReminders.map((r) => [
      r.id,
      r.itemName,
      r.currentWeight,
      r.thresholdWeight,
      new Date(r.reminderDate).toLocaleDateString(),
    ]);

    doc.text('Reminders Report', 14, 20);
    doc.text(`Date: ${selected.toLocaleDateString()}`, 14, 30);

    // Correct usage of autoTable
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [100, 100, 100] },
    });

    doc.save(`reminders_report_${selectedDate}.pdf`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">View Reminders</h1>
      <div className="flex justify-between mb-4 items-center">
        <Link to="/createreminder" className="text-blue-500">Create New Reminder</Link>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search by Item Name"
            value={searchQuery}
            onChange={handleSearch}
            className="border p-2 rounded w-64"
          />
          <div className="flex space-x-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border p-2 rounded"
            />
            <button
              onClick={generateReport}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Item Name</th>
            <th className="border p-2">Current Weight</th>
            <th className="border p-2">Threshold Weight</th>
            <th className="border p-2">Reminder Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReminders.map((reminder) => (
            <tr key={reminder._id}>
              <td className="border p-2">{reminder.id}</td>
              <td className="border p-2">{reminder.itemName}</td>
              <td className="border p-2">{reminder.currentWeight}</td>
              <td className="border p-2">{reminder.thresholdWeight}</td>
              <td className="border p-2">{new Date(reminder.reminderDate).toLocaleDateString()}</td>
              <td className="border p-2">
                <button
                  onClick={() => navigate(`/updatereminder/${reminder.id}`)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(reminder.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredReminders.length === 0 && (
            <tr>
              <td colSpan="6" className="border p-2 text-center">
                No reminders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewReminderPage;
