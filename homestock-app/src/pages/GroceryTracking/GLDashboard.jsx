import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar'
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
    creationDate: new Date().toISOString().substring(0, 10), // <-- Set current date
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createOrUpdateList = async () => {
    if (!form.title.trim()) {
      toast.warning('Title is required');
      return;
    }

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
  };

  const cancelEdit = () => {
    resetForm();
    toast.info('Edit cancelled');
  };

  const resetForm = () => {
    setForm({
      title: '',
      creationDate: new Date().toISOString().substring(0, 10), // <-- Set current date
      shoppingDate: '',
      status: 'Not Started',
      priority: 'High',
      notes: '',
    });
    setIsEditing(false);
    setEditingId(null);
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
      return sortOrder === 'dateAsc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <div>
      <Navbar />
    <div className="p-6 max-w-7xl mx-auto">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} theme="colored" />

      <h1 className="text-3xl font-semibold text-center text-black-700 mb-6">Grocery Tracking Dashboard</h1>

      {/* Form Section */}
      <div className="bg-white p-5 rounded-xl shadow-xl max-w-3xl mx-auto transition-transform hover:scale-105 ease-in-out duration-300">
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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">List Status</label>
              <div className="flex gap-3">
                <label><input type="radio" name="status" value="Not Started" checked={form.status === 'Not Started'} onChange={handleChange} /> Not Started</label>
                <label><input type="radio" name="status" value="In Progress" checked={form.status === 'In Progress'} onChange={handleChange} /> In Progress</label>
                <label><input type="radio" name="status" value="Complete" checked={form.status === 'Complete'} onChange={handleChange} /> Complete</label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full p-2.5 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
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
            </div>

            <div className="flex gap-3">
              <button
                className="w-full bg-green-600 text-white py-2.5 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                onClick={createOrUpdateList}
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
                  backgroundColor: '#fff', // White background inside the search field
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
                        className= "absolute right-1 top-1 bottom-1 bg-[#16a34a] text-white px-5 rounded-full flex items-center justify-center hover:bg-[#5a8c6f] transition-colors duration-200"
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
              backgroundColor: '#333', // Dark gray hover effect
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
      className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between min-h-[300px] transition-all hover:shadow-xl hover:-translate-y-1 duration-300"
    >
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{list.title}</h3>
        <p className="text-sm text-gray-600 mb-1"><strong>Created:</strong> {new Date(list.creationDate).toLocaleDateString()}</p>
        <p className="text-sm text-gray-600 mb-1"><strong>Shopping:</strong> {new Date(list.shoppingDate).toLocaleDateString()}</p>
        <p className="text-sm text-gray-600 mb-1"><strong>Status:</strong> {list.status}</p>
        <p className="text-sm text-gray-600 mb-1"><strong>Priority:</strong> {list.priority}</p>
        {list.notes && <p className="text-sm text-gray-500 mt-2 italic">"{list.notes}"</p>}
      </div>

      <div className="flex gap-3 mt-4">
        <button
          className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 font-medium"
          onClick={() => navigate(`/list/${list._id}`)}
        >
          View
        </button>
        <button
          className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 font-medium"
          onClick={() => handleEdit(list)}
        >
          Edit
        </button>
        <button
          className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 font-medium"
          onClick={() => deleteList(list._id)}
        >
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
