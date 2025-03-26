import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import GroceryTable from '../../components/groceryManagement/GroceryTable';
import { Button, IconButton, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import axios from "axios";

const API_URL = "http://localhost:3001/api/groceryList";

export default function GroceryList() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL)
      .then((response) => {
        setItems(response.data.response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching grocery list", error);
        setError(error);
        setLoading(false);
        setSnackbar({
          open: true,
          message: "Failed to load grocery items.",
          severity: 'error',
        });
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setItems(items.filter((item) => item._id !== id));
        setSnackbar({
          open: true,
          message: "Item deleted successfully",
          severity: 'success',
        });
      } catch (error) {
        console.error("Error deleting item:", error);
        setSnackbar({
          open: true,
          message: "Failed to delete item.",
          severity: 'error',
        });
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-grocery/${id}`);
  };

  const handleAddItem = () => {
    navigate('/add-item-to-grocery-list');
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return <p>Error loading grocery list.</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Grocery List</h1>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddItem}
            className="bg-blue-500 hover:bg-green-700"
          >
            Add Item
          </Button>
        </div>
        <div className="relative flex items-center w-full max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder="Search Grocery Items"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-5 pr-14 text-black bg-[#ffffff] rounded-full focus:outline-none placeholder-gray-700"
          />
          {searchQuery && (
            <IconButton
              onClick={() => setSearchQuery("")}
              className="absolute right-14 text-gray-500 hover:text-gray-700"
            >
              <ClearIcon />
            </IconButton>
          )}
          <Button
            onClick={() => console.log("Search clicked")}
            className="absolute right-1 top-1 bottom-1 bg-[#73AE88] text-white px-5 rounded-full flex items-center justify-center"
          >
            <SearchIcon />
          </Button>
        </div>

        <GroceryTable items={filteredItems} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
}