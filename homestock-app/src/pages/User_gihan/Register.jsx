import { Box } from "@mui/material";
import Navbar from "../../components/navbar/navbar";
import UserForm from "../../components/userManagement/RegisterForm";
import UsersTable from "../../components/userManagement/UsersTable";
import { useState } from "react";
import RegisterFrom from "../../components/userManagement/RegisterForm";

const registerUsers =[
    {
        id:1,
        username:'gihan',
        email: 'gihanmadhubhashana@gmail.com',
        phone:'0771344076',
        password:'1234',
        confirmPassword:'1234',

    },
    
    {
        id:2,
        username:'gihan2',
        email: 'gihanmadhubhashana@gmail.com',
        phone:'0771344076',
        password:'1234',
        confirmPassword:'1234',
    }
];

const Register = () => {
    return(
        <Box>
            <Navbar/>
            <Box>
                <RegisterFrom/>
                <UsersTable rows = {registerUsers} />
            </Box>
        </Box>

    );

}
export default Register;