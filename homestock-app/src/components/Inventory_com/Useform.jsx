import { Box, TextField, Typography, Button, Autocomplete } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Useform = ({ addUseItem, submitted, items, data, updateUseItem, isEdit }) => {
    const [useId, setUseId] = useState('');
    const [useName, setUseName] = useState('');
    const [useWeight, setUseWeight] = useState('');
    const [itemNames, setItemNames] = useState([]);
    const [errors, setErrors] = useState({
        useId: '',
        useName: '',
        useWeight: ''
    });

    // Function to get the next available ID from localStorage
    const getNextId = () => {
        const storedItems = JSON.parse(localStorage.getItem('groceryItems') || '[]');
        if (storedItems.length === 0) return 1;
        const maxId = Math.max(...storedItems.map(item => item.useId));
        return maxId + 1;
    };

    useEffect(() => {
        if (isEdit && data?.useId) {
            setUseId(data.useId);
            setUseName(data.useName);
            setUseWeight(data.useWeight);
        } else if (!isEdit) {
            setUseId(getNextId());
        }
    }, [data, isEdit]);

    useEffect(() => {
        if (!submitted) {
            setUseId(getNextId());
            setUseName('');
            setUseWeight('');
            setErrors({
                useId: '',
                useName: '',
                useWeight: ''
            });
        }
    }, [submitted]);

    useEffect(() => {
        const names = items.map(item => item.name);
        setItemNames(names);
    }, [items]);

    const validateForm = () => {
        const newErrors = {
            useId: '',
            useName: '',
            useWeight: ''
        };

        // Name validation
        if (!useName) newErrors.useName = 'Item selection is required';

        // Weight validation
        if (!useWeight) newErrors.useWeight = 'Weight is required';
        else if (isNaN(useWeight) || Number(useWeight) < 0.1) {
            newErrors.useWeight = 'Weight must be at least 0.1 kg';
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => !!error);
    };

    const handleNameChange = (event, newValue) => {
        setUseName(newValue);
    };

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

    const handleSubmit = () => {
        if (validateForm()) {
            const itemData = {
                useId: Number(useId),
                useName,
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
        <div className='flex justify-center'>
            <Box className="flex flex-col items-center justify-center w-full rounded-lg">
                <Box
                    component="form"
                    className="grid grid-cols-1 gap-4 p-4 rounded-lg shadow-md sm:grid-cols-2 md:grid-cols-5 bg-green-50"
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
                        disabled // Make ID field read-only
                        type="number"
                        error={!!errors.useId}
                        helperText={errors.useId}
                    />

                    <Autocomplete
                        options={itemNames}
                        value={useName}
                        onChange={handleNameChange}
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

                    <TextField
                        fullWidth
                        required
                        id="use-weight"
                        label="Weight (kg)"
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
                        className="h-10 px-4 py-2 font-bold text-white bg-green-600 rounded focus:outline-none focus:shadow-outline hover:bg-green-900 w-[100%]"
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