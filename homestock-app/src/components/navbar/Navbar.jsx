import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="mt-8 cursor-pointer">
      <nav className="flex items-center justify-between w-[95%] mx-auto h-8 rounded-[20px] bg-transparent">
        <div className="w-16 ml-5 text-4xl font-extrabold text-black font-Poppins">
          HOMESTOCK
        </div>
        <div>
          <ul className="flex items-center space-x-8">
            <li>
              <a
                onClick={() => navigate('/')}
                className={`text-[18px] font-Poppins ${
                  isActive('/')
                    ? 'text-white font-extrabold underline scale-105'
                    : 'text-black font-semibold hover:text-gray-200'
                }`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate('/groceryinventory')}
                className={`text-[18px] font-Poppins ${
                  isActive('/groceryinventory')
                    ? 'text-white font-extrabold underline scale-105'
                    : 'text-black font-semibold hover:text-gray-200'
                }`}
              >
                Grocery Stock
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate('/viewReminder')}
                className={`text-[18px] font-Poppins ${
                  isActive('/viewReminder')
                    ? 'text-white font-extrabold underline scale-105'
                    : 'text-black font-semibold hover:text-gray-200'
                }`}
              >
                Reminders
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate('/list-dashboard')}
                className={`text-[18px] font-Poppins ${
                  isActive('/list-dashboard')
                    ? 'text-white font-extrabold underline scale-105'
                    : 'text-black font-semibold hover:text-gray-200'
                }`}
              >
                Grocery List
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate('/recipe')}
                className={`text-[18px] font-Poppins ${
                  isActive('/recipe')
                    ? 'text-white font-extrabold underline scale-105'
                    : 'text-black font-semibold hover:text-gray-200'
                }`}
              >
                Recipe
              </a>
            </li>
          </ul>
        </div>
        <div>
         
        </div>
      </nav>
    </header>
  );
};

export default Navbar;