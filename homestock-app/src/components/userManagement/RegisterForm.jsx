import { useEffect, useState } from "react";
import { TextField, Button, Typography, Container, Paper } from "@mui/material";

const RegisterForm = ({ addUser, updateUser, submitted, data, isEdit }) => {

    const [id, setId] = useState(0);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [type, setType] = useState('User');

    const [error, setError] = useState("");

    useEffect(() => {
        if (!submitted) {
            setId(0);
            setUsername('');
            setEmail('');
            setPhone('');
            setPassword('');
            setConfirmPassword('');
            setType('User');
        }
    }, [submitted]);

    useEffect(() => {
        if (data && data.id && data.id !== 0) {
            setId(data.id);
            setUsername(data.username);
            setEmail(data.email);
            setPhone(data.phone);
            setPassword(data.password);
            setConfirmPassword(data.confirmPassword);
        }
    }, [data]);


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
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="bg-white"
                    />

                    {/* Username */}
                    <TextField
                        label="Username"
                        name="username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-white"
                    />

                    {/* Email */}
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white"
                    />

                    {/* Phone */}
                    <TextField
                        label="Phone Number"
                        type="tel"
                        name="phone"
                        variant="outlined"
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-white"
                    />

                    {/* Password */}
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white"
                    />

                    {/* Confirm Password */}
                    <TextField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        variant="outlined"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-white"
                    />

                    {/* Confirm Password */}
                    <TextField
                        label="User type"
                        type="text"
                        name="userType"
                        variant="outlined"
                        fullWidth
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="bg-white"

                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        className="py-2 mt-2 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
                        onClick={() => isEdit ? updateUser({ id, username, email, phone, password, confirmPassword, type }) :
                            addUser({ id, username, email, phone, password, confirmPassword, type })}
                    >
                        {
                            isEdit ? 'update' : 'Register'
                        }
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default RegisterForm;
