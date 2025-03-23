import { Box } from "@mui/material";
import Navbar from "../../components/navbar/navbar";
import UserForm from "../../components/userManagement/UserForm";
import UsersTable from "../../components/userManagement/UsersTable";
import { useState } from "react";

const registerUsers =[
    {
        id:1,
        name:'gihan',
    },
    
    {
        id:2,
        name:'gihan2',
    }
];

const Login = () => {
    return(
        <Box>
            <Navbar/>
            <Box>
                <UserForm/>
                <UsersTable rows = {registerUsers} />
            </Box>
        </Box>

    );

}
export default Login;