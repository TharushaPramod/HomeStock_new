// src/pages/groceryList/GroceryList.js
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import GroceryTable from '../../components/groceryManagement/GroceryTable';
import { Button, IconButton, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdf from '@mui/icons-material/PictureAsPdf';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import axios from "axios";
import { generateGroceryPDF } from '../../components/groceryManagement/pdfGenerator';
import Footer from '../../components/Footer';
const API_URL = "http://localhost:3001/api/groceryList";

export default function GroceryList() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedItems, setCheckedItems] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchGroceryList = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        setItems(response.data.response);
        const initialChecked = {};
        response.data.response.forEach(item => {
          initialChecked[item._id] = item.status === 'Purchased';
        });
        setCheckedItems(initialChecked);
      } catch (error) {
        console.error("Error fetching grocery list", error);
        setError(error);
        setSnackbar({
          open: true,
          message: "Failed to load grocery items.",
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGroceryList();
  }, []);

  const handleCheckboxChange = (id) => async (event) => {
    const isChecked = event.target.checked;
    try {
      setCheckedItems(prev => ({ ...prev, [id]: isChecked }));
      await axios.put(`${API_URL}/${id}`, {
        status: isChecked ? 'Purchased' : 'Pending'
      });
      setItems(prevItems => 
        prevItems.map(item => 
          item._id === id ? { ...item, status: isChecked ? 'Purchased' : 'Pending' } : item
        )
      );
    } catch (error) {
      console.error("Error updating item status:", error);
      setCheckedItems(prev => ({ ...prev, [id]: !isChecked }));
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setItems(items.filter((item) => item._id !== id));
        const newCheckedItems = {...checkedItems};
        delete newCheckedItems[id];
        setCheckedItems(newCheckedItems);
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

  const handleEdit = (id) => navigate(`/edit-grocery/${id}`);
  const handleAddItem = () => navigate('/add-item-to-grocery-list');

  const handleDownloadPDF = () => {
    const pdfDoc = generateGroceryPDF(items, checkedItems);
    pdfDoc.save('grocery-list.pdf');
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
          <div className="flex space-x-4">
            <Button
              variant="contained"
              startIcon={<PictureAsPdf />}
              onClick={handleDownloadPDF}
              className="bg-red-600 hover:bg-red-700 text-white"
              sx={{
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                '&:hover': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }
              }}
            >
              Download PDF
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddItem}
              className="bg-blue-500 hover:bg-green-700 text-white"
              sx={{
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                '&:hover': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }
              }}
            >
              Add Item
            </Button>
          </div>
        </div>
        <div className="relative flex items-center w-full max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder="Search Grocery Items"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-5 pr-14 text-black bg-[#ffffff] rounded-full focus:outline-none placeholder-gray-700 border border-gray-300 focus:border-green-500 transition-colors duration-200"
          />
          {searchQuery && (
            <IconButton
              onClick={() => setSearchQuery("")}
              className="absolute right-14 text-gray-500 hover:text-gray-700"
              size="small"
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          )}
          <Button
            onClick={() => console.log("Search clicked")}
            className="absolute right-1 top-1 bottom-1 bg-[#73AE88] text-white px-5 rounded-full flex items-center justify-center hover:bg-[#5a8c6f] transition-colors duration-200"
            size="small"
          >
            <SearchIcon fontSize="small" />
          </Button>
        </div>

        <GroceryTable 
          items={filteredItems} 
          onDelete={handleDelete} 
          onEdit={handleEdit}
          checkedItems={checkedItems}
          onCheckboxChange={handleCheckboxChange}
        />
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity={snackbar.severity} 
          sx={{ 
            width: '100%',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Footer />
    </div>
  );
}