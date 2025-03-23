import { useState } from "react";
import { TextField, Button, Typography, Container, Paper } from "@mui/material";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        id: 0,
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
        <Container maxWidth="sm" className="mt-10">
            <Paper elevation={3} className="p-6 bg-white rounded-lg shadow-lg">
                <Typography variant="h5" className="mb-4 font-bold text-center text-gray-800">
                    Register
                </Typography>

                {error && <Typography className="mb-4 text-sm text-red-500">{error}</Typography>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* ID */}
                    <TextField
                        label="ID"
                        type="number"
                        name="id"
                        variant="outlined"
                        fullWidth
                        value={formData.id}
                        onChange={handleChange}
                        className="bg-white"
                    />

                    {/* Username */}
                    <TextField
                        label="Username"
                        name="username"
                        variant="outlined"
                        fullWidth
                        value={formData.username}
                        onChange={handleChange}
                        className="bg-white"
                    />

                    {/* Email */}
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-white"
                    />

                    {/* Phone */}
                    <TextField
                        label="Phone Number"
                        type="tel"
                        name="phone"
                        variant="outlined"
                        fullWidth
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-white"
                    />

                    {/* Password */}
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        variant="outlined"
                        fullWidth
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-white"
                    />

                    {/* Confirm Password */}
                    <TextField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        variant="outlined"
                        fullWidth
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="bg-white"
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        className="py-2 mt-2 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        Register
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default RegisterForm;
