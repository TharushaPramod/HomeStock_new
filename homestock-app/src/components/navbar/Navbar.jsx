import React from 'react';

const Navbar = () => {
  return (
    <header className='mt-3'>
      <nav className='flex items-center justify-between w-[95%] mx-auto h-8 rounded-[20px] bg-transparent'>
        <div className='w-16 ml-5 font-extrabold text-black font-Poppins'>
          HOMESTOCK
        </div>
        <div>
          <ul className='flex items-center space-x-8'>
            <li>
              <a href='\' className='text-[12px] font-semibold hover:text-gray-200 font-Poppins hover:underline'>Home</a>
            </li>
            <li>
              <a href='\' className='text-[12px] font-semibold hover:text-gray-200 font-Poppins  hover:underline'>Grocery Stock</a>
            </li>
            <li>
              <a href='\' className='text-[12px] font-semibold hover:text-gray-200 font-Poppins  hover:underline'>Reminders</a>
            </li>
            <li>
              <a href='\' className='text-[12px] font-semibold hover:text-gray-200 font-Poppins  hover:underline'>Grocery List</a>
            </li>
            <li>
              <a href='\' className='text-[12px] font-semibold hover:text-gray-200 font-Poppins  hover:underline'>Recipe</a>
            </li>
          </ul>
        </div>
        <div>
          <button className='mr-5 text-[10px] font-Poppins  border-white rounded-[20px] h-7 w-[80px] hover:bg-[#50de82] transition-colors duration-300 border hover:border-[#3df57d] '>
            SIGN IN 
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;