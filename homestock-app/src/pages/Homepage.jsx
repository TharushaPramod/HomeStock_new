import React from 'react';
import Navbar from '../components/navbar/navbar';
import '../App.css';
import Api from '../api.jsx';
import InventorySummary from '../components/Inventory_com/InventorySummary.jsx';
import Image01 from '../images/home-image.png';
import Image02 from '../images/grc3.png';

function Homepage() {
  return (
    <div>
      <Navbar></Navbar>

      {/* Hero Section */}
      <div className="flex flex-col items-center">
        <h1 className="text-[100px] font-Poppins font-extrabold text-white mt-[50px] animate-fade-in hover:scale-105 transition-transform duration-300 text-opacity-25">
          Welcome to Home Stock
        </h1>
        <p className="flex justify-center max-w-2xl mt-4 text-lg font-medium leading-relaxed text-center text-white transition-transform duration-300 opacity-60 md:text-xl font-Poppins animate-fade-in hover:scale-105">
          Manage your home inventory, groceries, and household essentials with ease. Keep track of what you have and what you need, all in one place.
        </p>

        <img
          src={Image01}
          alt="Home Stock Illustration"
          className="flex justify-end w-full max-w-md mt-8 transition-transform duration-300 animate-fade-in hover:scale-105"
        />
      </div>

      {/* Features Section */}
      <div className="flex flex-col items-center mt-16 mb-16">
        <h2 className="text-4xl font-bold text-white text-opacity-75 font-Poppins animate-fade-in">
          Why Choose Home Stock?
        </h2>
        <div className="grid max-w-5xl grid-cols-1 gap-8 mt-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="flex flex-col items-center p-6 transition-transform duration-300 bg-white rounded-lg bg-opacity-10 hover:scale-105 animate-fade-in">
            <h3 className="text-2xl font-semibold text-white font-Poppins text-opacity-90">
              1000+ Users
            </h3>
            <p className="mt-2 text-center text-white text-opacity-70 font-Poppins">
              Join a growing community of over 1000 users who trust Home Stock to manage Seminary inventories.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center p-6 transition-transform duration-300 bg-white rounded-lg bg-opacity-10 hover:scale-105 animate-fade-in">
            <h3 className="text-2xl font-semibold text-white font-Poppins text-opacity-90">
              Easy to Manage
            </h3>
            <p className="mt-2 text-center text-white text-opacity-70 font-Poppins">
              Simplify your home organization with an intuitive interface designed for effortless tracking.
            </p>
          </div>

          {/* Feature 3 (Optional) */}
          <div className="flex flex-col items-center p-6 transition-transform duration-300 bg-white rounded-lg bg-opacity-10 hover:scale-105 animate-fade-in">
            <h3 className="text-2xl font-semibold text-white font-Poppins text-opacity-90">
              All-in-One Solution
            </h3>
            <p className="mt-2 text-center text-white text-opacity-70 font-Poppins">
              From groceries to essentials, keep everything in check with a single, powerful tool.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;