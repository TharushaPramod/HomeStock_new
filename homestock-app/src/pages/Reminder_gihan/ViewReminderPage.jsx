import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/Footer';

const ViewReminderPage = () => {
  const [reminders, setReminders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReminders, setSelectedReminders] = useState([]);
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

  const handleCheckboxChange = (id) => {
    setSelectedReminders((prev) =>
      prev.includes(id)
        ? prev.filter((reminderId) => reminderId !== id)
        : [...prev, id]
    );
  };

  // const isValidDate = (date) => {
  //   const parsedDate = new Date(date);
  //   return !isNaN(parsedDate.getTime());
  // };

  const filteredReminders = reminders
    .filter((reminder) =>
      reminder.itemName && typeof reminder.itemName === 'string'
        ? reminder.itemName.toLowerCase().includes(searchQuery.toLowerCase())
        : false
    );

  const generateReport = (type) => {
    let reportReminders = [];
    let reportTitle = '';

    if (type === 'selected') {
      if (selectedReminders.length === 0) {
        alert('Please select at least one reminder to generate the report.');
        return;
      }
      reportReminders = reminders.filter((r) => selectedReminders.includes(r.id));
      reportTitle = 'Selected Reminders Report';
    } else if (type === 'date') {
      if (!selectedDate) {
        alert('Please select a date to generate the report.');
        return;
      }
      const selected = new Date(selectedDate);
      reportReminders = reminders.filter((r) => {
        if (!isValidDate(r.reminderDate)) return false;
        const rDate = new Date(r.reminderDate).toISOString().split('T')[0];
        return rDate === selectedDate;
      });
      if (reportReminders.length === 0) {
        alert('No reminders found for the selected date.');
        return;
      }
      reportTitle = `Reminders Report for ${selected.toLocaleDateString()}`;
    }

    const doc = new jsPDF();

    const tableColumn = ['ID', 'Item Name', 'Reminder Weight'];
    const tableRows = reportReminders.map((r) => [
      r.id,
      r.itemName || 'N/A',
      r.reminderWeight,
    ]);

    doc.text(reportTitle, 14, 20);
    if (type === 'date') {
      doc.text(`Date: ${new Date(selectedDate).toLocaleDateString()}`, 14, 30);
    }

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: type === 'date' ? 40 : 30,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [100, 100, 100] },
    });

    const fileName = type === 'selected' ? 'selected_reminders_report.pdf' : `reminders_report_${selectedDate}.pdf`;
    doc.save(fileName);
  };

  return (
    <div>
      <Navbar />
      <div className="container p-6 mx-auto mt-12">
        <h1 className="mb-6 text-3xl font-extrabold text-gray-800">View Reminders</h1>
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:justify-end sm:items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <input
              type="text"
              placeholder="Search by Item Name"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-3 transition duration-200 border border-gray-300 rounded-lg sm:w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => generateReport('selected')}
                className="px-4 py-2 font-semibold text-white transition duration-200 bg-red-600 rounded-md shadow-md bg-opacity-85 hover:bg-red-700"
              >
                Generate Selected Report
              </button>
              <Link
                to="/createreminder"
                className="flex items-center justify-center px-4 py-2 font-semibold text-white transition duration-200 bg-blue-600 rounded-md shadow-md bg-opacity-85 hover:bg-blue-700"
              >
                Create New Reminder
              </Link>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full bg-white border border-gray-200">
            <thead className="bg-green-600 bg-opacity-90">
              <tr className="text-white bg-gradient-to-r">
                <th className="p-4 text-sm font-bold tracking-wider text-left uppercase">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedReminders(filteredReminders.map((r) => r.id));
                      } else {
                        setSelectedReminders([]);
                      }
                    }}
                    checked={filteredReminders.length > 0 && selectedReminders.length === filteredReminders.length}
                  />
                </th>
                <th className="p-4 text-sm font-bold tracking-wider text-left uppercase">ID</th>
                <th className="p-4 text-sm font-bold tracking-wider text-left uppercase">Item Name</th>
                <th className="p-4 text-sm font-bold tracking-wider text-left uppercase">Reminder Weight</th>
                <th className="p-4 text-sm font-bold tracking-wider text-left uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReminders.map((reminder, index) => (
                <tr
                  key={reminder._id}
                  className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition duration-150`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedReminders.includes(reminder.id)}
                      onChange={() => handleCheckboxChange(reminder.id)}
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-700">{reminder.id}</td>
                  <td className="p-4 text-gray-700">{reminder.itemName || 'N/A'}</td>
                  <td className="p-4 text-gray-700">{reminder.reminderWeight}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/updatereminder/${reminder.id}`)}
                        className="px-3 py-1 font-semibold text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(reminder.id)}
                        className="px-3 py-1 font-semibold text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredReminders.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="p-4 font-medium text-center text-gray-500"
                  >
                    No reminders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewReminderPage;