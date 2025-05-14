// import { useState, useEffect } from "react";
// import { TextField, Button, Box, Paper, Autocomplete, Typography } from "@mui/material";

// const ReminderForm = ({ addReminder, updateReminder, submitted, data, isEdit, items }) => {
//   const [id, setId] = useState(() => {
//     const storedId = localStorage.getItem('lastReminderId');
//     return storedId ? parseInt(storedId) + 1 : 1;
//   });
//   const [itemName, setItemName] = useState('');
//   const [thresholdWeight, setThresholdWeight] = useState('');
//   const [itemNames, setItemNames] = useState([]);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (!submitted) {
//       setItemName('');
//       setThresholdWeight('');
//       setErrors({});
//       if (!isEdit) {
//         const storedId = localStorage.getItem('lastReminderId');
//         setId(storedId ? parseInt(storedId) + 1 : 1);
//       }
//     }
//   }, [submitted, isEdit]);

//   useEffect(() => {
//     if (data && data.id && data.id !== 0 && isEdit) {
//       setId(data.id);
//       setItemName(data.itemName);
//       setThresholdWeight(data.thresholdWeight);
//     }
//   }, [data, isEdit]);

//   useEffect(() => {
//     const names = items.map(item => item.name);
//     setItemNames(names);
//   }, [items]);

//   const handleNameChange = (event, newValue) => {
//     setItemName(newValue);
//     validateField('itemName', newValue);
//   };

//   const handleThresholdChange = (e) => {
//     const value = e.target.value;
//     setThresholdWeight(value);
//     validateField('thresholdWeight', value);
//   };

//   const validateField = (fieldName, value) => {
//     let newErrors = { ...errors };

//     switch (fieldName) {
//       case 'itemName':
//         if (!value) {
//           newErrors.itemName = 'Item name is required';
//         } else {
//           delete newErrors.itemName;
//         }
//         break;
//       case 'thresholdWeight':
//         if (!value) {
//           newErrors.thresholdWeight = 'Threshold weight is required';
//         } else if (isNaN(value) || Number(value) <= 0) {
//           newErrors.thresholdWeight = 'Must be a positive number';
//         } else {
//           delete newErrors.thresholdWeight;
//         }
//         break;
//       default:
//         break;
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!itemName) {
//       newErrors.itemName = 'Item name is required';
//     }
//     if (!thresholdWeight) {
//       newErrors.thresholdWeight = 'Threshold weight is required';
//     } else if (isNaN(thresholdWeight) || Number(thresholdWeight) <= 0) {
//       newErrors.thresholdWeight = 'Threshold weight must be a positive number';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       const errorMessages = Object.values(errors).join('\n');
//       alert(`Please fix the following errors:\n${errorMessages}`);
//       return;
//     }

//     const reminderData = { id, itemName, thresholdWeight };

//     if (isEdit) {
//       updateReminder(reminderData);
//     } else {
//       addReminder(reminderData);
//       localStorage.setItem('lastReminderId', id);
//       setId(id + 1);
//     }

//     console.log("Reminder Data:", reminderData);
//     alert(`Reminder ${isEdit ? 'updated' : 'created'} successfully! ID: ${id}`);
//   };

//   const handleCancel = () => {
//     setItemName('');
//     setThresholdWeight('');
//     setErrors({});
//     if (!isEdit) {
//       const storedId = localStorage.getItem('lastReminderId');
//       setId(storedId ? parseInt(storedId) + 1 : 1);
//     }
//   };

//   return (
//     <Box className="flex flex-col items-center min-h-screen p-6">
//       <Paper component="form" onSubmit={handleSubmit} className="w-full max-w-lg p-6 mb-6 bg-white rounded-lg shadow-md">
//         <Typography variant="h5" className="mb-6 font-semibold text-center text-black font-Poppins">
//           Reminder Form
//         </Typography>
//         <Box className="flex flex-col gap-4">
//           <TextField
//             label="ID"
//             type="number"
//             variant="outlined"
//             fullWidth
//             name="id"
//             value={id}
//             disabled
//           />
//           <Autocomplete
//             options={itemNames}
//             value={itemName}
//             onChange={handleNameChange}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Select Item"
//                 variant="outlined"
//                 size="small"
//                 required
//                 error={!!errors.itemName}
//                 helperText={errors.itemName}
//               />
//             )}
//           />
//           <TextField
//             label="Threshold Weight (kg)"
//             type="number"
//             variant="outlined"
//             fullWidth
//             name="thresholdWeight"
//             value={thresholdWeight}
//             onChange={handleThresholdChange}
//             error={!!errors.thresholdWeight}
//             helperText={errors.thresholdWeight}
//             inputProps={{ min: 0, step: "0.1" }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             type="submit"
//             className="text-white bg-green-600 hover:bg-green-900"
//           >
//             {isEdit ? 'Update Reminder' : 'Add Reminder'}
//           </Button>
//           <Button
//             variant="outlined"
//             color="secondary"
//             onClick={handleCancel}
//             className="text-gray-700 border-gray-500 hover:bg-gray-100"
//           >
//             Cancel
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default ReminderForm;
import React from 'react'

export default function ReminderForm() {
  return (
    <div>ReminderForm</div>
  )
}