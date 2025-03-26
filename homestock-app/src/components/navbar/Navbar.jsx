
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();



  return (
    <header className='mt-8'>
      <nav className='flex items-center justify-between w-[95%] mx-auto h-8 rounded-[20px] bg-transparent'>
        <div className='w-16 ml-5 text-4xl font-extrabold text-black font-Poppins'>
          HOMESTOCK
        </div>
        <div>

          <ul className='flex items-center space-x-8'>
            <li>

              <a onClick={() => navigate('/')} className='text-[18px] font-semibold hover:text-gray-200 font-Poppins hover:underline '>Home</a>
            </li>
            <li>
              <a onClick={() => navigate('/groceryinventory')} className='text-[18px] font-semibold hover:text-gray-200 font-Poppins  hover:underline'>Grocery Stock</a>
            </li>
            <li>
              <a onClick={() => navigate('/reminder')} className='text-[18px] font-semibold hover:text-gray-200 font-Poppins  hover:underline'>Reminders</a>
            </li>
            <li>
              <a href='\' className='text-[18px] font-semibold hover:text-gray-200 font-Poppins  hover:underline'>Grocery List</a>
            </li>
            <li>
              <a onClick={() => navigate('/recipe')} className='text-[18px] font-semibold hover:text-gray-200 font-Poppins  hover:underline'>Recipe</a>
            </li>
          </ul>
        </div>
        <div>
          <button className='mr-5 text-[15px] font-Poppins  border-white rounded-[50px] h-7 w-[80px] hover:bg-[#ffffff] transition-colors duration-300 border hover:border-[#ffffff] '>
            <a onClick={() => navigate('/register')}>
              SIGN IN
            </a>
          </button>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;