import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Axios from "axios";
import { Box } from "@mui/material";
import ReminderForm from "../../components/reminderManagement/ReminderForm";

import { data } from "react-router-dom";
import ReminderTable from "../../components/reminderManagement/ReminderTable";

import Footer from "../../components/Footer";




const Reminder = () => {

    const [items, setItems] = useState([]);

    const [reminders, setReminders] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedReminder, setSelectedReminder] = useState({});

    useEffect(() => {
        fetchReminders();
        getItems();
    }, []);

    const getItems = () => {
        Axios.get('http://localhost:3001/api/items')
            .then(response => {
                setItems(response.data?.response || []);
            })
            .catch(error => {
                console.log("Axios Error: ", error);
            })
    }

    const fetchReminders = () => {
        Axios.get('http://localhost:3001/api/getReminders')
            .then(response => {
                setReminders(response.data);

            })
            .catch(error => {
                console.log("Axios error is: ", error);

            })
    }

    const addReminder = (data) => {
        setSubmitted(true);

        const payload = {
            id: data.id,
            itemName: data.itemName,
            // currentWeight: data.currentWeight,
            thresholdWeight: data.thresholdWeight,
            // reminderDate: data.reminderDate,

        }

        Axios.post('http://localhost:3001/api/addReminder', payload)
            .then(() => {
                fetchReminders();
                setSubmitted(false);
                isEdit(false);
            })
            .catch(error => {
                console.log("Axios error is: ", error);

            })
    }

    const updateReminder = (data) => {
        setSubmitted(true);

        const payload = {
            id: data.id,
            itemName: data.itemName,
            // currentWeight: data.currentWeight,
            thresholdWeight: data.thresholdWeight,
            // reminderDate: data.reminderDate,

        }

        Axios.post('http://localhost:3001/api/updateReminder', payload)
            .then(() => {
                fetchReminders();
                setSubmitted(false);
                isEdit(false);
            })
            .catch(error => {
                console.log("Axios error is: ", error);

            })
    }

    const deleteReminder = (data) => {
        Axios.post('http://localhost:3001/api/deleteReminder', data)
            .then(() => {
                fetchReminders();
            })
            .catch(error => {
                console.log("Axios error is: ", error);

            })
    }

    return (
        <Box>
            <Navbar />
            <Box>
                <ReminderForm
                    addReminder={addReminder}
                    updateReminder={updateReminder}
                    submitted={submitted}
                    data={selectedReminder}
                    isEdit={isEdit}
                    items ={items}
                />
                <ReminderTable
                    rows={reminders}
                    selectedReminder={data => {
                        setSelectedReminder(data);
                        setIsEdit(true);

                    }}
                    deleteReminder={data => window.confirm('Are you sure?') && deleteReminder(data)}
                />

            </Box>
            <Footer/>


        </Box>

    );

}
export default Reminder;
