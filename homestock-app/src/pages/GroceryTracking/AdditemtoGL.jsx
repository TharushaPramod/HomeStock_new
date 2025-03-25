import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { Button, TextField, MenuItem, Snackbar, Alert } from "@mui/material";

const categories = [
    'Fruits',
    'Vegetables',
    'Diary',
    'Meat',
    'Bakery',
    'Other'
];

export default function AddItemtoGL() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name:'',
        quantity:'',
        category:'',
        notes:''
    });
    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]:''
            });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Item name is required';
        if (!formData.quantity || isNaN(formData.quantity)) {
            newErrors.quantity = 'Quantity must be a number';
        } else if (Number(formData.quantity) <= 0) {
            newErrors.quantity = 'Quantity must be posititve';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setSnackbarMessage('Item added succesfully!');
            setOpenSnackbar(true);
            setTimeout(() => navigate('/grocery-list'), 1500);
        }
    };

    const handleCancel = () => {
        navigate('/grocery-list');
    };

    return(
        <div className="min-h-screen style={{ backgroundColor: '#f9fafb' }}">
            <Navbar />
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
                            className="mb-2"
                        />
                    </div>

                    <div className="mb-4">
                        <TextField 
                            fullWidth
                            label="Quantity "
                            name="quantity"
                            type="number"
                            value={formData.quantity}
                            onChange={handleChange}
                            error={!!errors.quantity}
                            helperText={errors.quantity}
                            className="mb-2"
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
                            className="mb-2"
                        >
                        {categories.map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                        </TextField>
                    </div>

                    <div className="mb-6">
                        <TextField
                            fullWidth
                            label="Notes (Optional)"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            multiline
                            rows={3}
                        />
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
            <Alert severity="success" sx={{ width: '100%' }}>
                {snackbarMessage}
            </Alert>
        </Snackbar>

        </div>
    );
}