import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar'; 
import GroceryTable from '../../components/groceryManagement/GroceryTable';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom';

const initialItems = [
  {
    id: 1,
    name: 'Apples',
    quantity: 5,
    category: 'Fruits',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Carrots',
    quantity: 10,
    category: 'Vegetables',
    status: 'Purchased',
  },
  {
    id: 3,
    name: 'Milk',
    quantity: 2,
    category: 'Diary',
    status: 'Pending'
  },
];

export default function GroceryList(){
  const[items, setItems] = useState(initialItems);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if(confirmDelete){
      setItems(items.filter((item) => item.id !== id ));
    }
  };

  const handleAddItem = () => {
    navigate('/add-item');
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return(
    <div>
      <Navbar />

        <div className="container mx-auro p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Grocery List</h1>
            <Button
              variant='contained'
              startIcon={<AddIcon/>}
              onClick={handleAddItem}
              className='bg-blue-500 hover:bg-blue-700'
            >
                Add Item
            </Button>
          </div>
          <TextField
            fullWidth
            variant='outlined'
            placeholder='Search items...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='mb-6'
          />
          <GroceryTable items={items} onDelete={handleDelete} />
        </div>
    </div>
  );
}