import { Box, TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';

const ItemForm = ({ addItem, submitted, data, isEdit, updateItem }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [errors, setErrors] = useState({
    id: '',
    name: '',
    qty: '',
    weight: '',
    price: '',
    expireDate: ''
  });

  const getNextId = () => {
    const storedItems = JSON.parse(localStorage.getItem('inventoryItems') || '[]');
    if (storedItems.length === 0) return 1;
    const maxId = Math.max(...storedItems.map(item => item.id));
    return maxId + 1;
  };

  useEffect(() => {
    if (isEdit && data?.id) {
      setId(data.id);
      setName(data.name);
      setQty(data.qty || '');
      setWeight(data.weight);
      setPrice(data.price);
      setExpireDate(data.expireDate);
    } else {
      setId(getNextId());
    }
  }, [data, isEdit]);

  useEffect(() => {
    if (!submitted) {
      setId(getNextId());
      setName('');
      setQty('');
      setWeight('');
      setPrice('');
      setExpireDate('');
      setErrors({
        id: '',
        name: '',
        qty: '',
        weight: '',
        price: '',
        expireDate: ''
      });
    }
  }, [submitted]);

  const validateForm = () => {
    const newErrors = {
      id: '',
      name: '',
      qty: '',
      weight: '',
      price: '',
      expireDate: ''
    };

    if (!name) newErrors.name = 'Name is required';
    else if (name.trim().length === 0) newErrors.name = 'Name cannot be just whitespace';

    if (!qty) newErrors.qty = 'Quantity type is required';

    if (!weight) newErrors.weight = 'Weight is required';
    else if (isNaN(weight) || Number(weight) < 0.1) newErrors.weight = 'Weight must be at least 0.1';

    if (!price) newErrors.price = 'Price is required';
    else if (isNaN(price) || Number(price) < 0) newErrors.price = 'Price must be a non-negative number';

    if (!expireDate) newErrors.expireDate = 'Expire date is required';
    else {
      const selectedDate = new Date(expireDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time for comparison
      if (selectedDate < today) newErrors.expireDate = 'Expire date cannot be in the past';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => !!error);
  };

  const saveToLocalStorage = (itemData) => {
    const storedItems = JSON.parse(localStorage.getItem('inventoryItems') || '[]');
    if (isEdit) {
      const updatedItems = storedItems.map(item =>
        item.id === itemData.id ? itemData : item
      );
      localStorage.setItem('inventoryItems', JSON.stringify(updatedItems));
    } else {
      storedItems.push(itemData);
      localStorage.setItem('inventoryItems', JSON.stringify(storedItems));
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const itemData = {
        id: Number(id),
        name: name.trim(),
        qty,
        weight: Number(weight),
        price: Number(price),
        expireDate
      };
      if (isEdit) {
        updateItem(itemData);
      } else {
        addItem(itemData);
      }
      saveToLocalStorage(itemData);
    }
  };

  return (
    <div className="flex justify-center px-4 mt-8 mb-[100px]">
      <Box className="w-full max-w-7xl">
        <Box
          component="form"
          className="grid grid-cols-1 gap-6 p-6 bg-white shadow-2xl rounded-xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 opacity-90"
        >
          <Typography
            variant="h5"
            className="mb-4 font-semibold text-center text-gray-800 font-Poppins col-span-full"
          >
            {isEdit ? 'Update Grocery Item' : 'Add Grocery Item'}
          </Typography>

          <TextField
            fullWidth
            required
            id="id"
            label="ID"
            variant="outlined"
            size="small"
            value={id}
            disabled
            type="number"
            error={!!errors.id}
            helperText={errors.id}
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

          <TextField
            fullWidth
            required
            id="name"
            label="Name"
            variant="outlined"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
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

          <FormControl fullWidth required error={!!errors.qty}>
            <InputLabel id="qty-type-label" size="small" sx={{ color: '#6b7280' }}>
              Quantity Typesss
            </InputLabel>
            <Select
              labelId="qty-type-label"
              id="qty"
              value={qty}
              label="Quantity Type"
              onChange={(e) => setQty(e.target.value)}
              variant="outlined"
              size="small"
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
            {errors.qty && (
              <Typography color="error" variant="caption" className="mt-1">
                {errors.qty}
              </Typography>
            )}
          </FormControl>

          <TextField
            fullWidth
            required
            id="weight"
            label="Quantity"
            type="number"
            variant="outlined"
            size="small"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            error={!!errors.weight}
            helperText={errors.weight}
            inputProps={{ min: 0.1, step: "0.1" }}
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

          <TextField
            fullWidth
            required
            id="price"
            label="Price"
            type="number"
            variant="outlined"
            size="small"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={!!errors.price}
            helperText={errors.price}
            inputProps={{ min: 0, step: "0.01" }}
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

          <TextField
            fullWidth
            required
            id="expireDate"
            label="Expire Date"
            type="date"
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={expireDate}
            onChange={(e) => setExpireDate(e.target.value)}
            error={!!errors.expireDate}
            helperText={errors.expireDate}
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
            className="px-6 py-2 text-sm text-white transition-all duration-300 transform rounded-lg shadow-md bg-gradient-to-r from-green-500 to-emerald-600 font-Poppins hover:from-green-600 hover:to-emerald-700 hover:scale-105 col-span-full sm:col-span-2 md:col-span-1 lg:col-span-1 lg:col-start-4"
            onClick={handleSubmit}
          >
            {isEdit ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default ItemForm;