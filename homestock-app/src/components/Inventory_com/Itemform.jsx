import { Box, TextField, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';

const ItemForm = ({addItem, submitted, data, isEdit, updateItem}) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [expireDate, setExpireDate] = useState('');

  useEffect(() => {
    if(!submitted) {
      setId('');
      setName('');
      setQty('');
      setWeight('');
      setPrice('');
      setExpireDate('');
    }
  }, [submitted]);

  useEffect(() => {
    if(data?.id && data.id !== 0) {
      setId(data.id);
      setName(data.name);
      setQty(data.qty);
      setWeight(data.weight);
      setPrice(data.price);
      setExpireDate(data.expireDate);
    }
  }, [data]);

  return (
    <div className='flex justify-center'>
    <Box className="flex flex-col items-center p-4 bg-white bg-opacity-50 w-[90%] rounded-lg justify-center">
      <Typography variant="h5" className="mb-6 font-bold">
        Add Grocery
      </Typography>
      
      <Box
        component="form"
        className="grid grid-cols-1 gap-4 p-4 bg-white rounded-lg shadow-md sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-[90%]"
      >

        
        {/* ID Field */}
        <TextField
          fullWidth
          required
          id="id"
          label="ID"
          variant="outlined"
          size="small"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        {/* Name Field */}
        <TextField
          fullWidth
          id="name"
          label="Name"
          variant="outlined"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Quantity Field */}
        <TextField
          fullWidth
          required
          id="qty"
          label="Quantity"
          type="number"
          variant="outlined"
          size="small"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />

        {/* Weight Field */}
        <TextField
          fullWidth
          required
          id="weight"
          label="Weight"
          type="number"
          variant="outlined"
          size="small"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        {/* Price Field */}
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
        />

        {/* Expire Date Field */}
        <TextField
          fullWidth
          required
          id="expireDate"
          label="Expire Date"
          type="date"
          variant="outlined"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          value={expireDate}
          onChange={(e) => setExpireDate(e.target.value)}
        />
      </Box>

      {/* Submit Button */}
      <Box className="flex justify-center w-full mt-6">
        <Button
          variant="contained"
          color="primary"
          className="h-10 col-span-3 px-4 py-2 font-bold text-white bg-green-600 rounded w-[25%] focus:outline-none focus:shadow-outline hover:bg-green-900"
          onClick={() => isEdit ? updateItem({id, name, qty, weight, price, expireDate}) : 
                               addItem({id, name, qty, weight, price, expireDate})}
        >
          {isEdit ? 'Update' : 'Add'}
        </Button>
      </Box>
    </Box>
    </div>
  );
}

export default ItemForm;