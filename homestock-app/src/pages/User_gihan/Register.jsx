import { Box } from "@mui/material";
import Navbar from "../../components/navbar/navbar";
import UsersTable from "../../components/userManagement/UsersTable";
import RegisterFrom from "../../components/userManagement/RegisterForm";
import Axios from "axios";
import { useEffect, useState } from "react";
import { data } from "react-router-dom";

const Register = () => {

    const [registerUsers, setRegisterUsers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        Axios.get('http://localhost:3001/api/users')
            .then(response => {
                setRegisterUsers(response.data?.response || []);
            })
            .catch(error => {
                console.error("Axios error is: ", error);
            })
    }

    const addUser = (data) => {
        setSubmitted(true);

        const payload = {
            id: data.id,
            username: data.username,
            email: data.email,
            phone: data.phone,
            password: data.password,
            confirmPassword: data.confirmPassword,
            type: data.type,
        }
        Axios.post('http://localhost:3001/api/createUser', payload)
            .then(() => {
                getUsers();                //auto reload page
                setSubmitted(false);
                isEdit(false);
            })
            .catch(error => {
                console.log("Axios Error : ", error);
            })
    }

    const updateUser = (data) => {
        setSubmitted(true);

        const payload = {
            id: data.id,
            username: data.username,
            email: data.email,
            phone: data.phone,
            password: data.password,
            confirmPassword: data.confirmPassword,
            type: data.type,
        }
        Axios.post('http://localhost:3001/api/updateUser', payload)
            .then(() => {
                getUsers();
                setSubmitted(false);
                isEdit(false);
            })
            .catch(error => {
                console.log("Axios Error : ", error);
            })
    }

    const deleteUser = (data) => {
        Axios.post('http://localhost:3001/api/deleteUser', data)
            .then(() => {
                getUsers();

            })
            .catch(error => {
                console.log("Axios Error : ", error);
            })
    }




    return (
        <Box>
            <Navbar />
            <Box>
                <RegisterFrom
                    addUser={addUser}
                    updateUser={updateUser}
                    submitted={submitted}
                    data={selectedUser}
                    isEdit={isEdit}
                    
                />
                <UsersTable
                    rows={registerUsers}
                    selectedUser={data => {
                        setSelectedUser(data);
                        setIsEdit(true);
                    }}
                    deleteUser={data =>window.confirm('Are you sure?') && deleteUser(data)}
                />
            </Box>
        </Box>

    );

}
export default Register;