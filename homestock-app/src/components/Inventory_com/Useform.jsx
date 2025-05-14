import { Box, TextField, Typography, Button, Autocomplete, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Useform = ({ addUseItem, submitted, items, useItems, data, updateUseItem, isEdit }) => {
    const [useId, setUseId] = useState('');
    const [useName, setUseName] = useState('');
    const [useType, setUseType] = useState('');
    const [useWeight, setUseWeight] = useState('');
    const [itemNames, setItemNames] = useState([]);
    const [itemMap, setItemMap] = useState({});
    const [errors, setErrors] = useState({
        useId: '',
        useName: '',
        useType: '',
        useWeight: ''
    });
    const [remainingWeight, setRemainingWeight] = useState(null);

    const getNextId = () => {
        const storedItems = JSON.parse(localStorage.getItem('groceryItems') || '[]');
        if (storedItems.length === 0) return 1;
        const maxId = Math.max(...storedItems.map(item => item.useId));
        return maxId + 1;
    };

    const getTotalWeightByName = () => {
        const weightMap = {};
        items.forEach((item) => {
            if (!weightMap[item.name]) {
                weightMap[item.name] = 0;
            }
            weightMap[item.name] += Number(item.weight) || 0;
        });
        return weightMap;
    };

    const getTotalUsedWeightByName = () => {
        const usedWeightMap = {};
        useItems.forEach((item) => {
            if (!usedWeightMap[item.useName]) {
                usedWeightMap[item.useName] = 0;
            }
            usedWeightMap[item.useName] += Number(item.useWeight) || 0;
        });
        return usedWeightMap;
    };

    useEffect(() => {
        if (useName) {
            const available = getTotalWeightByName();
            const used = getTotalUsedWeightByName();
            const remaining = (available[useName] || 0) - (used[useName] || 0);
            setRemainingWeight(remaining.toFixed(2));
        } else {
            setRemainingWeight(null);
        }
    }, [useName, items, useItems]);

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
            setRemainingWeight(null);
        }
    }, [submitted]);

    useEffect(() => {
        const names = items.map(item => item.name);
        const nameToQtyMap = items.reduce((acc, item) => {
            acc[item.name] = item.qty;
            return acc;
        }, {});
        setItemNames(names);
        setItemMap(nameToQtyMap);
    }, [items]);

    const validateForm = () => {
        const newErrors = {
            useId: '',
            useName: '',
            useType: '',
            useWeight: '' // Fixed syntax error here
        };

        if (!useName) newErrors.useName = 'Item selection is required';
        if (!useType) newErrors.useType = 'Quantity type is required';
        if (!useWeight) newErrors.useWeight = 'Weight is required';
        else if (isNaN(useWeight) || Number(useWeight) < 0.1) {
            newErrors.useWeight = 'Weight must be at least 0.1';
        } else {
            const available = getTotalWeightByName()[useName] || 0;
            const currentUsed = getTotalUsedWeightByName()[useName] || 0;
            let effectiveRemaining = available - currentUsed;

            if (isEdit && data?.useWeight) {
                const originalWeight = Number(data.useWeight);
                effectiveRemaining += originalWeight;
            }

            if (Number(useWeight) > effectiveRemaining) {
                newErrors.useWeight = `Weight cannot exceed remaining: ${effectiveRemaining.toFixed(2)}`;
            }
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => !!error);
    };

    const handleNameChange = (event, newValue) => {
        setUseName(newValue);
        if (newValue && itemMap[newValue]) {
            setUseType(itemMap[newValue]);
        } else {
            setUseType('');
        }
        setUseWeight('');
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
        <div className="flex justify-center px-4 mt-8 mb-[100px]">
            <Box className="w-full max-w-6xl">

                <Box
                    component="form"
                    className="grid grid-cols-1 gap-6 p-6 bg-white border shadow-2xl rounded-xl sm:grid-cols-2 md:grid-cols-3 opacity-90"
                >
                    <Typography
                        variant="h5"
                        className="mb-4 font-semibold text-center text-gray-800 font-Poppins col-span-full"
                    >
                        {isEdit ? 'Update Used Item' : 'Use Grocery Item'}
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
                        className="bg-white rounded-lg shadow-sm"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                '& fieldset': { borderColor: '#e2e8f0' },
                                '&:hover fieldset': { borderColor: '#34d399' },
                                '&.Mui-focused fieldset': { borderColor: '#34d399' },
                            },
                            '& .MuiInputLabel-root': { color: '#6b7280' },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#34d399' },
                        }}
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
                                className="bg-white rounded-lg shadow-sm"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        '& fieldset': { borderColor: '#e2e8f0' },
                                        '&:hover fieldset': { borderColor: '#34d399' },
                                        '&.Mui-focused fieldset': { borderColor: '#34d399' },
                                    },
                                    '& .MuiInputLabel-root': { color: '#6b7280' },
                                    '& .MuiInputLabel-root.Mui-focused': { color: '#34d399' },
                                }}
                            />
                        )}
                    />

                    <FormControl fullWidth required>
                        <InputLabel id="useType" size="small" sx={{ color: '#6b7280' }}>
                            Quantity Type
                        </InputLabel>
                        <Select
                            labelId="useType"
                            id="useType"
                            value={useType}
                            label="Quantity Type"
                            onChange={(e) => setUseType(e.target.value)}
                            variant="outlined"
                            size="small"
                            error={!!errors.useType}
                            className="bg-white rounded-lg shadow-sm"
                            sx={{
                                borderRadius: '8px',
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#34d399' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#34d399' },
                            }}
                        >
                            <MenuItem value="Kg">Kg</MenuItem>
                            <MenuItem value="gram">gram</MenuItem>
                            <MenuItem value="Liter">Liter</MenuItem>
                            <MenuItem value="Quantity">Quantity</MenuItem>
                            <MenuItem value="Packet">Packet</MenuItem>
                        </Select>
                        {errors.useType && (
                            <Typography color="error" variant="caption" className="mt-1">
                                {errors.useType}
                            </Typography>
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
                        helperText={errors.useWeight || (remainingWeight !== null ? `Remaining: ${remainingWeight}` : '')}
                        inputProps={{
                            min: 0.1,
                            step: 0.1,
                            max: remainingWeight !== null ? Number(remainingWeight) : undefined
                        }}
                        className="bg-white rounded-lg shadow-sm"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                '& fieldset': { borderColor: '#e2e8f0' },
                                '&:hover fieldset': { borderColor: '#34d399' },
                                '&.Mui-focused fieldset': { borderColor: '#34d399' },
                            },
                            '& .MuiInputLabel-root': { color: '#6b7280' },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#34d399' },
                        }}
                    />

                    <Button
                        variant="contained"
                        className="px-6 py-2 text-sm text-white transition-all duration-300 transform rounded-lg shadow-md bg-gradient-to-r from-green-500 to-emerald-600 font-Poppins hover:from-green-600 hover:to-emerald-700 hover:scale-105 col-span-full sm:col-span-2 md:col-span-1 md:col-start-3"
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