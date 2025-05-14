import { Instagram, WhatsApp, Facebook } from "@mui/icons-material";
import { FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="w-full text-white py-6 border-t border-white bg-transparent">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-6 text-center md:text-left">
        
        <div>
          <h2 className="text-3xl font-extrabold tracking-wide font-poppins">HOMESTOCK</h2>
        </div>

        <div>
          <h3 className="font-semibold text-white">Navigation</h3>
          <ul className="space-y-1 text-gray-200">
            <li className="hover:text-gray-400 cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              <Link to="/grocery-stocks">Grocery Stocks</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              <Link to="/grocery-list">Grocery List</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              <Link to="/reminders">Reminders</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              <Link to="/recipes">Recipes</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-semibold text-white">Help & Support</h3>
          <ul className="space-y-1 text-gray-200">
            <li className="hover:text-gray-400 cursor-pointer">
              <Link to="/help">Customer Service / Help Center</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              <Link to="/how-it-works">How It Works / User Guide</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              <Link to="/report-issue">Report an Issue</Link>
            </li>
          </ul>
        </div>

       
        <div>
          <h3 className="font-semibold text-white">Legal & Policies</h3>
          <ul className="space-y-1 text-gray-200">
            <li className="hover:text-gray-400 cursor-pointer">
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              <Link to="/terms">Terms & Conditions</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              <Link to="/cookies-settings">Cookies Settings</Link>
            </li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-semibold text-white">Contact Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <Instagram className="text-white text-2xl cursor-pointer hover:text-gray-400 transition" />
            <WhatsApp className="text-white text-2xl cursor-pointer hover:text-gray-400 transition" />
            <Facebook className="text-white text-2xl cursor-pointer hover:text-gray-400 transition" />
            <FaTiktok className="text-white text-2xl cursor-pointer hover:text-gray-400 transition" />
          </div>
        </div>

      </div>

      
      <div className="text-center text-gray-400 text-sm mt-6">
        © 2025 HomeStock. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
