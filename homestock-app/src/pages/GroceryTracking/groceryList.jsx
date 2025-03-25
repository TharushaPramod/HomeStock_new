import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar'; 
import GroceryTable from '../../components/groceryManagement/GroceryTable';
import { Button, IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';

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
    navigate('/add-item-to-grocery-list');
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return(
    <div>
      <Navbar />

        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Grocery List</h1>
            <Button
              variant='contained'
              startIcon={<AddIcon/>}
              onClick={handleAddItem}
              className='bg-blue-500 hover:bg-green-700'
            >
                Add Item
            </Button>
          </div>
          <div className='relative flex items-center w-full max-w-md mx-auto mb-6'>
            <input
              type='text'
              placeholder='Search Grocery Items'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full p-3 pl-5 pr-14 text-black bg-[#ffffff] rounded-full focus:outline-none placeholder-gray-700'
            />
            {searchQuery && (
              <IconButton
                onClick={() => setSearchQuery("")}
                className='absolute right-14 text-gray-500 hover:text-gray-700'
              >
                <ClearIcon />

              </IconButton>
            )}
            <Button
              onClick={() => console.log("Search clicked")}
              className='absolute right-1 top-1 bottom-1 bg-[#73AE88] text-white px-5 rounded-full flex items-center justify-center'
            >
              <SearchIcon />
            </Button>
          </div>
          
          <GroceryTable items={items} onDelete={handleDelete} />
        </div>
    </div>
  );
}