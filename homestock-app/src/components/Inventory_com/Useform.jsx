import { Box, TextField, Typography, Button, Autocomplete, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Useform = ({ addUseItem, submitted, items, data, updateUseItem, isEdit }) => {
    const [useId, setUseId] = useState('');
    const [useName, setUseName] = useState('');
    const [useType, setUseType] = useState('');
    const [useWeight, setUseWeight] = useState('');
   
    const [itemNames, setItemNames] = useState([]); // Store item names for Autocomplete
    const [itemMap, setItemMap] = useState({}); // Store mapping of name to qty type
    const [errors, setErrors] = useState({
        useId: '',
        useName: '',
        useType: '',
        useWeight: ''
    });

    // Function to get the next available ID from localStorage
    const getNextId = () => {
        const storedItems = JSON.parse(localStorage.getItem('groceryItems') || '[]');
        if (storedItems.length === 0) return 1;
        const maxId = Math.max(...storedItems.map(item => item.useId));
        return maxId + 1;
    };

    // Populate form fields when editing
    useEffect(() => {
        if (isEdit && data?.useId) {
            setUseId(data.useId);
            setUseName(data.useName);
            setUseType(data.useType);
            setUseWeight(data.useWeight);
        } else if (!isEdit) {
            setUseId(getNextId());
        }
    }, [data, isEdit]);

    // Reset form after submission
    useEffect(() => {
        if (!submitted) {
            setUseId(getNextId());
            setUseName('');
            setUseType('');
            setUseWeight('');
            setErrors({
                useId: '',
                useName: '',
                useType: '',
                useWeight: ''
            });
        }
    }, [submitted]);

    // Extract names and qty types from items prop and create a mapping
    useEffect(() => {
        const names = items.map(item => item.name); // Extract item names
        const nameToQtyMap = items.reduce((acc, item) => {
            acc[item.name] = item.qty; // Map each name to its qty type (e.g., "Milk" -> "Liter")
            return acc;
        }, {});
        setItemNames(names); // Update Autocomplete options
        setItemMap(nameToQtyMap); // Store the name-to-qty mapping
    }, [items]);

    // Validate form fields
    const validateForm = () => {
        const newErrors = {
            useId: '',
            useName: '',
            useType: '',
            useWeight: ''
        };

        if (!useName) newErrors.useName = 'Item selection is required';
        if (!useType) newErrors.useType = 'Quantity type is required';
        if (!useWeight) newErrors.useWeight = 'Weight is required';
        else if (isNaN(useWeight) || Number(useWeight) < 0.1) {
            newErrors.useWeight = 'Weight must be at least 0.1 kg';
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => !!error);
    };

    // Handle name selection and auto-set useType
    const handleNameChange = (event, newValue) => {
        setUseName(newValue); // Update selected name
        if (newValue && itemMap[newValue]) {
            setUseType(itemMap[newValue]); // Automatically set useType based on selected name
        } else {
            setUseType(''); // Clear useType if no matching item
        }
    };

    // Save or update item in localStorage
    const saveToLocalStorage = (itemData) => {
        const storedItems = JSON.parse(localStorage.getItem('groceryItems') || '[]');
        
        if (isEdit) {
            const updatedItems = storedItems.map(item => 
                item.useId === itemData.useId ? itemData : item
            );
            localStorage.setItem('groceryItems', JSON.stringify(updatedItems));
        } else {
            storedItems.push(itemData);
            localStorage.setItem('groceryItems', JSON.stringify(storedItems));
        }
    };

    // Handle form submission
    const handleSubmit = () => {
        if (validateForm()) {
            const itemData = {
                useId: Number(useId),
                useName,
                useType,
                useWeight: Number(useWeight)
            };
            
            if (isEdit) {
                updateUseItem(itemData);
            } else {
                addUseItem(itemData);
            }
            
            saveToLocalStorage(itemData);
        }
    };

    return (
        <div className='flex items-center justify-center'>
            <Box className="flex flex-col items-center justify-center rounded-lg w-[90%]">
                <Box
                    component="form"
                    className="grid grid-cols-1 gap-4 p-4 bg-gray-200 bg-opacity-50 rounded-lg hadow-md sm:grid-cols-2 md:grid-cols-6"
                >
                    <Typography variant="h5" className="mb-6 font-semibold font-Poppins">
                        Use Grocery Item
                    </Typography>
                    
                    <TextField
                        fullWidth
                        required
                        id="use-id"
                        label="ID"
                        variant="outlined"
                        size="small"
                        value={useId}
                        disabled
                        type="number"
                        error={!!errors.useId}
                        helperText={errors.useId}
                    />

                    <Autocomplete
                        options={itemNames}
                        value={useName}
                        onChange={handleNameChange} // Trigger name change and auto-set useType
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Item"
                                variant="outlined"
                                size="small"
                                required
                                error={!!errors.useName}
                                helperText={errors.useName}
                            />
                        )}
                    />

                    <FormControl fullWidth required>
                        <InputLabel id="useType" size="small">Quantity Type</InputLabel>
                        <Select
                            labelId="useType"
                            id="useType"
                            value={useType} // Value is auto-set based on item selection
                            label="Quantity Type"
                            onChange={(e) => setUseType(e.target.value)} // Allow manual override if needed
                            variant="outlined"
                            size="small"
                            error={!!errors.useType}
                        >
                            <MenuItem value="Kg">Kg</MenuItem>
                            <MenuItem value="gram">gram</MenuItem>
                            <MenuItem value="Liter">Liter</MenuItem>
                            <MenuItem value="Quantity">Quantity</MenuItem>
                            <MenuItem value="Packet">Packet</MenuItem>
                        </Select>
                        {errors.useType && (
                            <Typography color="error" variant="caption">{errors.useType}</Typography>
                        )}
                    </FormControl>

                    <TextField
                        fullWidth
                        required
                        id="use-weight"
                        label="Quantity"
                        type="number"
                        variant="outlined"
                        size="small"
                        value={useWeight}
                        onChange={(e) => setUseWeight(e.target.value)}
                        error={!!errors.useWeight}
                        helperText={errors.useWeight}
                        inputProps={{ min: 0.1, step: 0.1 }}
                    />
                    
                    <Button
                        variant="contained"
                        color="primary"
                        className="h-10 px-4 py-2 font-bold text-white bg-green-600 rounded focus:outline-none focus:shadow-outline hover:bg-green-900 "
                        onClick={handleSubmit}
                    >
                        {isEdit ? 'Update' : 'Add'}
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default Useform;