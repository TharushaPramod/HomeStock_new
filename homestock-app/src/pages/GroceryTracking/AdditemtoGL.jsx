import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, MenuItem, Snackbar, Alert } from "@mui/material";
import axios from "axios"; // Add axios import

const categories = [
    'Fruits',
    'Vegetables',
    'Dairy',
    'Meat',
    'Bakery',
    'Other'
];

const statusOptions = ['Pending', 'Purchased'];

export default function AddItemtoGL() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        category: '', // Ensure category is empty by default
        status: 'Pending'
    });
    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Add severity state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Item name is required';
        if (!formData.quantity || isNaN(formData.quantity)) {
            newErrors.quantity = 'Quantity must be a number';
        } else if (Number(formData.quantity) <= 0) {
            newErrors.quantity = 'Quantity must be positive';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                await axios.post("http://localhost:3001/api/groceryList", {
                    name: formData.name,
                    quantity: formData.quantity,
                    category: formData.category,
                    status: formData.status
                });
                setSnackbarMessage("Item added successfully!");
                setSnackbarSeverity('success'); // Success
                setOpenSnackbar(true);
                setTimeout(() => navigate("/grocery-list"), 1500);
            } catch (error) {
                setSnackbarMessage("Failed to add item.");
                setSnackbarSeverity('error'); // Error
                setOpenSnackbar(true);
            }
        }
    };

    const handleCancel = () => {
        navigate('/grocery-list');
    };

    return (
        <div className="min-h-screen style={{ background: 'linear-gradient(to bottom, #73AE88, #142D1D)' }}">
            
            <div className="container mx-auto p-4 max-w-md">

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Add New Item</h1>
                    <div className="mb-4">
                        <TextField
                            fullWidth
                            label="Item Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </div>

                    <div className="mb-4">
                        <TextField
                            fullWidth
                            label="Quantity"
                            name="quantity"
                            type="number"
                            value={formData.quantity}
                            onChange={handleChange}
                            error={!!errors.quantity}
                            helperText={errors.quantity}
                        />
                    </div>

                    <div className="mb-4">
                        <TextField
                            select
                            fullWidth
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            error={!!errors.category}
                            helperText={errors.category}
                        >
                            {categories.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div className="mb-4">
                        <TextField
                            select
                            fullWidth
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            {statusOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Button
                            variant="outlined"
                            onClick={handleCancel}
                            className="border-gray-500 text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            Save Item
                        </Button>
                    </div>
                </form>
            </div>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}
