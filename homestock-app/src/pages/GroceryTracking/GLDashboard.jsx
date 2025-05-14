import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import cartImage from '../../images/shopping.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, IconButton, Button, MenuItem, Select, InputLabel, FormControl, InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

export default function GLDashboard() {
  const [lists, setLists] = useState([]);
  const [form, setForm] = useState({
    title: '',
    creationDate: new Date().toISOString().substring(0, 10), // Set current date
    shoppingDate: '',
    status: 'Not Started',
    priority: 'High',
    notes: '',
  });  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('dateDesc');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const fetchLists = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/lists');
      setLists(res.data);
    } catch (err) {
      console.error('Error fetching lists:', err);
      toast.error('Failed to fetch lists');
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) {
      newErrors.title = 'Title is required.';
    } else if (!/^[a-zA-Z0-9\s]+$/.test(form.title)) {
      newErrors.title = 'Title can only contain letters, numbers, and spaces.';
    }
    const today = new Date().toISOString().substring(0, 10);
    if (!form.creationDate) {
      newErrors.creationDate = 'Creation date is required.';
    } else if (form.creationDate > today) {
      newErrors.creationDate = 'Creation date cannot be in the future.';
    }
    if (!form.shoppingDate) {
      newErrors.shoppingDate = 'Shopping date is required.';
    } else if (form.shoppingDate < form.creationDate) {
      newErrors.shoppingDate = 'Shopping date cannot be earlier than creation date.';
    }
    if (!form.status) {
      newErrors.status = 'Please select a status.';
    }
    if (!form.priority) {
      newErrors.priority = 'Please select a priority.';
    }
    if (form.notes && form.notes.length > 200) {
      newErrors.notes = 'Notes cannot exceed 200 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    switch (name) {
      case 'title':
        if (!value.trim()) {
          newErrors.title = 'Title is required.';
        } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
          newErrors.title = 'Title can only contain letters, numbers, and spaces.';
        } else {
          delete newErrors.title;
        }
        break;
      case 'creationDate':
        const today = new Date().toISOString().substring(0, 10);
        if (!value) {
          newErrors.creationDate = 'Creation date is required.';
        } else if (value > today) {
          newErrors.creationDate = 'Creation date cannot be in the future.';
        } else {
          delete newErrors.creationDate;
        }
        break;
      case 'shoppingDate':
        if (!value) {
          newErrors.shoppingDate = 'Shopping date is required.';
        } else if (value < form.creationDate) {
          newErrors.shoppingDate = 'Shopping date cannot be earlier than creation date.';
        } else {
          delete newErrors.shoppingDate;
        }
        break;
      case 'status':
        if (!value) {
          newErrors.status = 'Please select a status.';
        } else {
          delete newErrors.status;
        }
        break;
      case 'priority':
        if (!value) {
          newErrors.priority = 'Please select a priority.';
        } else {
          delete newErrors.priority;
        }
        break;
      case 'notes':
        if (value && value.length > 200) {
          newErrors.notes = 'Notes cannot exceed 200 characters.';
        } else {
          delete newErrors.notes;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const createOrUpdateList = async () => {
    if (validateForm()) {
      try {
        if (isEditing) {
          await axios.put(`http://localhost:3001/api/lists/${editingId}`, form);
          toast.success('List updated successfully');
        } else {
          await axios.post('http://localhost:3001/api/lists', form);
          toast.success('List created successfully');
        }
        resetForm();
        fetchLists();
      } catch (err) {
        console.error('Error saving list:', err);
        toast.error('Failed to save list');
      }
    } else {
      toast.error('Please fix the validation errors before submitting.');
    }
  };

  const handleEdit = (list) => {
    setForm({
      title: list.title,
      creationDate: list.creationDate?.substring(0, 10),
      shoppingDate: list.shoppingDate?.substring(0, 10),
      status: list.status,
      priority: list.priority,
      notes: list.notes || '',
    });
    setIsEditing(true);
    setEditingId(list._id);
    setErrors({}); // Clear errors when editing
  };

  const cancelEdit = () => {
    resetForm();
    toast.info('Edit cancelled');
  };

  const resetForm = () => {
    setForm({
      title: '',
      creationDate: new Date().toISOString().substring(0, 10), // Set current date
      shoppingDate: '',
      status: 'Not Started',
      priority: 'High',
      notes: '',
    });
    setIsEditing(false);
    setEditingId(null);
    setErrors({}); // Clear errors on reset
  };  

  const deleteList = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/lists/${id}`);
      toast.success('List deleted');
      fetchLists();
    } catch (err) {
      console.error('Error deleting list:', err);
      toast.error('Failed to delete list');
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setPriorityFilter('');
    setSortOrder('dateDesc');
  };

  const filteredAndSortedLists = lists
    .filter((list) =>
      list.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter ? list.status === statusFilter : true) &&
      (priorityFilter ? list.priority === priorityFilter : true)
    )
    .sort((a, b) => {
      const dateA = new Date(a.creationDate);
      const dateB = new Date(b.creationDate);
      console.log(`Comparing: ${a.creationDate} (${dateA}) vs ${b.creationDate} (${dateB})`);
      return sortOrder === 'dateAsc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} theme="colored" />

        <h1 className="text-3xl font-semibold text-center text-black-700 mb-6">Grocery Tracking Dashboard</h1>

        {/* Form Section */}
        <div className="bg-gray-50 p-5 rounded-xl shadow-xl max-w-3xl mx-auto transition-transform hover:scale-105 ease-in-out duration-300">
          <h2 className="text-xl font-bold text-white bg-green-600 text-center py-2 rounded mb-6">
            {isEditing ? 'Edit List' : 'Create New List'}
          </h2>

          <div className="flex gap-6 items-center justify-center">
            <div className="flex-shrink-0">
              <img src={cartImage} alt="Shopping cart" className="w-30 h-auto border rounded-xl shadow-lg" />
            </div>

            <div className="w-full space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  className="w-full p-2.5 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter List Title"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Creation Date</label>
                <input
                  className="w-full p-2.5 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="date"
                  name="creationDate"
                  value={form.creationDate}
                  onChange={handleChange}
                />
                {errors.creationDate && <p className="text-red-500 text-xs mt-1">{errors.creationDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shopping Date</label>
                <input
                  className="w-full p-2.5 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="date"
                  name="shoppingDate"
                  value={form.shoppingDate}
                  onChange={handleChange}
                />
                {errors.shoppingDate && <p className="text-red-500 text-xs mt-1">{errors.shoppingDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">List Status</label>
                <div className="flex gap-3">
                  <label><input type="radio" name="status" value="Not Started" checked={form.status === 'Not Started'} onChange={handleChange} /> Not Started</label>
                  <label><input type="radio" name="status" value="In Progress" checked={form.status === 'In Progress'} onChange={handleChange} /> In Progress</label>
                  <label><input type="radio" name="status" value="Complete" checked={form.status === 'Complete'} onChange={handleChange} /> Complete</label>
                </div>
                {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full p-2.5 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea
                  className="w-full p-2.5 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  name="notes"
                  rows="2"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Enter any additional notes"
                ></textarea>
                {errors.notes && <p className="text-red-500 text-xs mt-1">{errors.notes}</p>}
              </div>

              <div className="flex gap-3">
                <button
                  className="w-full bg-green-600 text-white py-2.5 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                  onClick={createOrUpdateList}
                  disabled={Object.keys(errors).length > 0}
                >
                  {isEditing ? 'Update List' : 'Create New List'}
                </button>
                {isEditing && (
                  <button
                    className="w-full bg-gray-400 text-white py-2.5 rounded-lg shadow-md hover:bg-gray-500 transition duration-300"
                    onClick={cancelEdit}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="my-6 max-w-3xl mx-auto">
          <div className="relative">
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                  borderRadius: 5,
                },
              }}
              InputProps={{
                endAdornment: (
                  <>
                    {searchQuery && (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setSearchQuery('')}
                          className="text-gray-500 hover:text-gray-700"
                          size="small"
                        >
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    )}
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => console.log('Search clicked')}
                        className="absolute right-1 top-1 bottom-1 bg-[#16a34a] text-white px-5 rounded-full flex items-center justify-center hover:bg-[#5a8c6f] transition-colors duration-200"
                        size="small"
                      >
                        <SearchIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  </>
                ),
              }}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mt-4 max-w-3xl mx-auto">
          <FormControl size="small" className="min-w-[150px] bg-white rounded" variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Not Started">Not Started</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Complete">Complete</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" className="min-w-[150px] bg-white rounded" variant="outlined">
            <InputLabel>Priority</InputLabel>
            <Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} label="Priority">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" className="min-w-[150px] bg-white rounded" variant="outlined">
            <InputLabel>Sort By</InputLabel>
            <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} label="Sort By">
              <MenuItem value="dateDesc">Newest First</MenuItem>
              <MenuItem value="dateAsc">Oldest First</MenuItem>
            </Select>
          </FormControl>

          <Button
            onClick={resetFilters}
            variant="contained"
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              border: '1px solid #333',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            Reset Filters
          </Button>
        </div>

        {/* Render Filtered Lists */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredAndSortedLists.map((list) => (
            <div
              key={list._id}
              className="relative bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between min-h-[320px] transition-all hover:scale-105 hover:shadow-2xl duration-300 border-t-4 border-gradient-to-r from-green-400 to-green-600"
            >
              <div className="absolute inset-0 rounded-xl pointer-events-none hover:ring-4 hover:ring-green-300/50 transition-all duration-300"></div>
              <div>
                <h3 className="text-2xl font-extrabold text-green-900 mb-4 truncate drop-shadow-sm">{list.title}</h3>
                <div className="space-y-3 text-gray-700 text-sm">
                  <p><strong className="text-gray-800">Created:</strong> {new Date(list.creationDate).toLocaleDateString()}</p>
                  <p><strong className="text-gray-800">Shopping:</strong> {new Date(list.shoppingDate).toLocaleDateString()}</p>
                  <p>
                    <strong className="text-gray-800">Status:</strong>
                    <span className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${
                        list.status === 'Complete' ? 'bg-green-500' :
                        list.status === 'In Progress' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}></span>
                      <span className="capitalize">{list.status}</span>
                    </span>
                  </p>
                  <p>
                    <strong className="text-gray-800">Priority:</strong>
                    <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      list.priority === 'High' ? 'bg-red-100 text-red-800' :
                      list.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {list.priority}
                    </span>
                  </p>
                  {list.notes && (
                    <p className="text-gray-600 italic text-sm line-clamp-2">
                      <strong className="text-gray-800">Notes:</strong> {list.notes.length > 50 ? `${list.notes.substring(0, 50)}...` : list.notes}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 rounded-lg hover:from-green-600 hover:to-teal-600 transition duration-200 font-medium text-sm relative overflow-hidden group"
                  onClick={() => navigate(`/list/${list._id}`)}
                >
                  <span className="absolute inset-0 bg-white opacity-20 transform scale-0 group-hover:scale-100 transition-transform duration-200 rounded-lg"></span>
                  View
                </button>
                <button
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition duration-200 font-medium text-sm relative overflow-hidden group"
                  onClick={() => handleEdit(list)}
                >
                  <span className="absolute inset-0 bg-white opacity-20 transform scale-0 group-hover:scale-100 transition-transform duration-200 rounded-lg"></span>
                  Edit
                </button>
                <button
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition duration-200 font-medium text-sm relative overflow-hidden group"
                  onClick={() => deleteList(list._id)}
                >
                  <span className="absolute inset-0 bg-white opacity-20 transform scale-0 group-hover:scale-100 transition-transform duration-200 rounded-lg"></span>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}