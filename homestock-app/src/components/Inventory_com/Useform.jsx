import { Box, TextField, Typography, Button, Autocomplete } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Useform = ({ addUseItem, submitted, items, data, updateUseItem, isEdit }) => {
    const [useId, setUseId] = useState('');
    const [useName, setUseName] = useState('');
    const [useWeight, setUseWeight] = useState('');
    const [itemNames, setItemNames] = useState([]);

    useEffect(() => {
        if (data?.useId && data.useId !== 0) {
            setUseId(data.useId);
            setUseName(data.useName);
            setUseWeight(data.useWeight);
        }
    }, [data]);

    useEffect(() => {
        if (!submitted) {
            setUseId('');
            setUseName('');
            setUseWeight('');
        }
    }, [submitted]);

    useEffect(() => {
        const names = items.map(item => item.name);
        setItemNames(names);
    }, [items]);

    const handleNameChange = (event, newValue) => {
        setUseName(newValue);
    };

    return (
        <div className='flex justify-center'>
            <Box className="flex flex-col items-center p-4 bg-white bg-opacity-50 w-[90%] rounded-lg justify-center">
                <Typography variant="h5" className="mb-6 font-bold">
                    Use Grocery Item
                </Typography>
                
                <Box
                    component="form"
                    className="grid grid-cols-1 gap-4 p-4 bg-white rounded-lg shadow-md sm:grid-cols-2 md:grid-cols-3 w-[90%]"
                >
                    {/* ID Field */}
                    <TextField
                        fullWidth
                        required
                        id="use-id"
                        label="ID"
                        variant="outlined"
                        size="small"
                        value={useId}
                        onChange={(e) => setUseId(e.target.value)}
                        type="number"
                    />

                    {/* Name Field - Autocomplete */}
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
                            />
                        )}
                    />

                    {/* Weight Field */}
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
                        inputProps={{ min: 0.1, step: 0.1 }}
                    />
                </Box>

                {/* Submit Button */}
                <Box className="flex justify-center w-full mt-6">
                    <Button
                        variant="contained"
                        color="primary"
                        className="h-10 col-span-3 px-4 py-2 font-bold text-white bg-green-600 rounded w-[25%] focus:outline-none focus:shadow-outline hover:bg-green-900"
                        onClick={() => isEdit ? 
                            updateUseItem({ useId, useName, useWeight }) : 
                            addUseItem({ useId, useName, useWeight })}
                    >
                        {isEdit ? 'Update' : 'Add'}
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default Useform;