import { Box, TextField, Typography, Button } from '@mui/material';
import React, { useState } from 'react';

const ItemForm = props => {

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [expireDate, setExpireDate] = useState('');





    
  return (

    <div className="flex justify-center">
    
    <Box className="flex flex-col items-center justify-center w-[70%]  mt-7 ml-2 ">
      



      <Box
        component="form"
        className="grid grid-cols-3 gap-3 p-6 bg-white rounded-lg shadow-md sm:grid-cols-3 bg-opacity-30"
        
      >
        <Typography  className="mb-2 text-xl font-bold font-Poppins">
        Add Grocery Item
      </Typography>
      
        {/* ID Field */}
        <div className="mb-4 ">
          <TextField
            fullWidth
            required
            id="id"
            label="ID"
            variant="outlined"
            size="small"
            value={id}
            onChange={(e) => setId(e.target.value)}
            
            
            className="w-full max-w-[200px]"
          />
        </div>

        {/* Name Field */}
        <div className="mb-4">
          <TextField
            fullWidth
            required
            id="name"
            label="Name"
            variant="outlined"
            size="small"
            className="w-full max-w-[200px]"
            value={name}
            onChange={(e) => setName(e.target.value)}

            
          />
        </div>

        {/* Quantity Field */}
        <div className="mb-4">
          <TextField
            fullWidth
            required
            id="qty"
            label="Quantity"
            type="number"
            variant="outlined"
           size="small"
            className="w-full max-w-[200px]"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            
          />
        </div>

        {/* Weight Field */}
        <div className="mb-4">
          <TextField
            fullWidth
            required
            id="weight"
            label="Weight"
            type="number"
            variant="outlined"
           size="small"
            className="w-full max-w-[100px]"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            
            
          />
        </div>

        {/* Price Field */}
        <div className="mb-4">
          <TextField
            fullWidth
            required
            id="price"
            label="Price"
            type="number"
            variant="outlined"
           size="small"
            className="w-full max-w-[200px]"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
           
          />
        </div>

        {/* Expire Date Field */}
        <div className="mb-6">
          <TextField
            fullWidth
            required
            id="expireDate"
            label="Expire Date"
            type="date"
            variant="outlined"
            size="small"
            className="w-full max-w-[200px]"
            InputLabelProps={{
              shrink: true, // Ensures the label doesn't overlap the date input
            }}
            value={expireDate}
            onChange={(e) => setExpireDate(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center"></div>
        <Button
          type="submit"
          variant="contained"
          className="h-10 px-4 py-2 font-bold text-white bg-green-600 rounded focus:outline-none focus:shadow-outline hover:bg-green-900 " 
        >
          Submit
        </Button>
        
      </Box>
    </Box>
    </div>
  );
}

export default ItemForm;