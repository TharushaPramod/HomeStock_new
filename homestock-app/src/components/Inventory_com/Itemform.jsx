import { Box, TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';

const ItemForm = ({ addItem, submitted, data, isEdit, updateItem }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [qty, setQty] = useState(''); // Changed from qty to qtyType
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [errors, setErrors] = useState({
    id: '',
    name: '',
    qty: '', // Changed from qty to qtyType
    weight: '',
    price: '',
    expireDate: ''
  });

  // Function to get the next available ID from localStorage
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
      setQty(data.qty || ''); // Changed from qty to qtyType
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
      setQty(''); // Changed from qty to qtyType
      setWeight('');
      setPrice('');
      setExpireDate('');
      setErrors({
        id: '',
        name: '',
        qty: '', // Changed from qty to qtyType
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
      qty: '', // Changed from qty to qtyType
      weight: '',
      price: '',
      expireDate: ''
    };

    // Name validation
    if (!name) newErrors.name = 'Name is required';
    else if (name.trim().length === 0) newErrors.name = 'Name cannot be just whitespace';

    // Quantity Type validation
    if (!qty) newErrors.qty = 'Quantity type is required';

    // Weight validation
    if (!weight) newErrors.weight = 'Weight is required';
    else if (isNaN(weight) || Number(weight) < 0.1) newErrors.weight = 'Weight must be at least 0.1';

    // Price validation
    if (!price) newErrors.price = 'Price is required';
    else if (isNaN(price) || Number(price) < 0) newErrors.price = 'Price must be a non-negative number';

    // Expire Date validation
    if (!expireDate) newErrors.expireDate = 'Expire date is required';
    else if (new Date(expireDate) < new Date()) newErrors.expireDate = 'Expire date cannot be in the past';

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
        qty, // Changed from qty to qtyType, no need to convert to Number
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
    <div className='flex justify-center'>
      <Box className="flex flex-col items-center justify-center rounded-lg w-[90%]">
        <Box
          component="form"
          className="grid grid-cols-1 gap-4 p-4 rounded-lg shadow-md  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[100%] bg-white bg-opacity-80"
        >
          <Typography variant="h5" className="mb-6 font-semibold font-Poppins">
            Add Grocery
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
            error={!!errors.id}
            helperText={errors.id}
            type="number"
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
          />

          <FormControl fullWidth required error={!!errors.qty}>
            <InputLabel id="qty-type-label" size="small">Quantity Type</InputLabel>
            <Select
              labelId="qty-type-label"
              id="qty"
              value={qty}
              label="Quantity Type"
              onChange={(e) => setQty(e.target.value)}
              variant="outlined"
              size="small"
            >
              <MenuItem value="Kg">Kg</MenuItem>
              <MenuItem value="gram">gram</MenuItem>
              <MenuItem value="Liter">Liter</MenuItem>
              <MenuItem value="Quantity">Quantity</MenuItem>
              <MenuItem value="Packet">Packet</MenuItem>
              
            </Select>
            {errors.qty && (
              <Typography color="error" variant="caption">{errors.qty}</Typography>
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
          />

          <Button
            variant="contained"
            color="primary"
            className="h-10 font-bold text-white bg-green-600 rounded focus:outline-none focus:shadow-outline hover:bg-green-900"
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