import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, MenuItem, Snackbar, Alert } from '@mui/material';


const API_URL = "http://localhost:3001/api/grocerylist"; // lowercase to match backend

const categories = ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery', 'Other'];
const statuses = ['Pending', 'Purchased'];

export default function EditGroceryItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    category: '',
    status: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        if (response.data) {
          setFormData({
            name: response.data.name,
            quantity: response.data.quantity,
            category: response.data.category,
            status: response.data.status
          });
        } else {
          throw new Error('No data received');
        }
      } catch (err) {
        console.error("Error fetching item:", err);
        setSnackbar({
          open: true,
          message: 'Failed to load item data',
          severity: 'error'
        });
        // Optionally navigate back if the item doesn't exist
        setTimeout(() => navigate("/grocery-list"), 2000);
      } finally {
        setLoading(false);
      }
    };
    
    fetchItem();
  }, [id]);
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Item name is required';
    if (!formData.quantity || isNaN(formData.quantity)) {
      newErrors.quantity = 'Quantity must be a number';
    } else if (Number(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be positive';
    }
    if (!formData.status) newErrors.status = 'Status is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const dataToSend = {
          name: formData.name.trim(),
          quantity: Number(formData.quantity),
          category: formData.category,
          status: formData.status
        };
  
        const response = await axios.put(`${API_URL}/${id}`, dataToSend);
        
        if (response.data) {
          setSnackbar({
            open: true,
            message: "Item updated successfully!",
            severity: 'success'
          });
          navigate("/grocery-list");
        }
      } catch (error) {
        console.error("Update error:", error);
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Failed to update item",
          severity: 'error'
        });
      }
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 style={{ background: 'linear-gradient(to bottom, #73AE88, #142D1D)' }} ">
      <div className="container mx-auto p-4 max-w-md">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-green-600 py-4 px-6">
            <h2 className="text-2xl font-bold text-white text-center">Edit Grocery Item</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <TextField
                fullWidth
                label="Item Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                required
                variant="outlined"
                className="bg-gray-50 rounded-lg"
                InputProps={{
                  className: "text-gray-800"
                }}
              />
              
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                error={!!errors.quantity}
                helperText={errors.quantity}
                required
                variant="outlined"
                className="bg-gray-50 rounded-lg"
              />
              
              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                variant="outlined"
                className="bg-gray-50 rounded-lg"
              >
                {categories.map(option => (
                  <MenuItem 
                    key={option} 
                    value={option}
                    className="hover:bg-green-50"
                  >
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              
              <TextField
                select
                fullWidth
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                error={!!errors.status}
                helperText={errors.status}
                required
                variant="outlined"
                className="bg-gray-50 rounded-lg"
              >
                {statuses.map(option => (
                  <MenuItem 
                    key={option} 
                    value={option}
                    className="hover:bg-green-50"
                  >
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                variant="outlined"
                onClick={() => navigate('/grocery-list')}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-2 rounded-lg transition-all duration-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Update Item
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({...prev, open: false}))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}  
        sx={{
          bottom: { xs: 90, sm: 24 }  
        }}
      >
        <Alert 
          severity={snackbar.severity}
          className="shadow-lg"
          sx={{
            backgroundColor: snackbar.severity === 'success' ? '#16a34a' : '#dc2626',
            color: 'white'
          }}
        >
          <span className="font-semibold">{snackbar.message}</span>
        </Alert>
      </Snackbar>
    </div>
  );
}