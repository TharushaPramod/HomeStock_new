import { useState } from "react";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        id: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear error when user types
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log("User Data:", formData);
        alert("Registration Successful!");
    };

    return (
        <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
            <h1 className="mb-4 text-2xl font-bold text-center text-gray-800">Register</h1>

            {/** ID */}
            <div className="mb-4">
                <label htmlFor="id" className="block font-medium text-gray-700">
                    ID
                </label>
                <input
                    type="number"
                    id="id"
                    name="id"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    value={formData.id}
                    onChange={handleChange}
                />
            </div>

            {/** Username */}
            <div className="mb-4">
                <label htmlFor="username" className="block font-medium text-gray-700">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>

            {/** Email */}
            <div className="mb-4">
                <label htmlFor="email" className="block font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            {/** Phone */}
            <div className="mb-4">
                <label htmlFor="phone" className="block font-medium text-gray-700">
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>

            {/** Password */}
            <div className="mb-4">
                <label htmlFor="password" className="block font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>

            {/** Confirm Password */}
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block font-medium text-gray-700">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
            </div>

            {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

            {/** Submit Button */}
            <button
                onClick={handleSubmit}
                className="w-full py-2 text-white transition duration-200 rounded-md bg-cyan-400 hover:bg-cyan-500"
            >
                Register
            </button>
        </div>
    );
};

export default RegisterForm;
