import { useState, useEffect } from "react";
import { TextField, Button, Card, CardContent, Typography, IconButton, Box, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


const ReminderForm = ({ addReminder, updateReminder, submitted, data, isEdit }) => {

  const [id, setId] = useState(0);
  const [itemName, setItemName] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [thresholdWeight, setThresholdWeight] = useState('');
  const [reminderDate, setReminderDate] = useState('');

  useEffect(() => {
    if (!submitted) {
      setId(0);
      setItemName('');
      setCurrentWeight('');
      setThresholdWeight('');
      setReminderDate('');
    }
  }, [submitted]);

  useEffect(() => {
    if (data && data.id && data.id !== 0) {
      setId(data.id);
      setItemName(data.itemName);
      setCurrentWeight(data.currentWeight);
      setThresholdWeight(data.thresholdWeight);
      setReminderDate(data.reminderDate);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("User Data:", formData);
    alert("Reminder create Successful!");
  };

  return (
    <Box className="flex flex-col items-center min-h-screen p-6">
      <Typography variant="h4" className="mb-6 text-center text-blue-600">
        Restocking Reminders
      </Typography>

      {/* Form Section */}
      <Paper onSubmit={handleSubmit} className="w-full max-w-lg p-6 mb-6 bg-white rounded-lg shadow-md">
        <Box className="flex flex-col gap-4">
          <TextField
            label="id"
            type="number"
            variant="outlined"
            fullWidth
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <TextField
            label="Item Name"
            variant="outlined"
            fullWidth
            name="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            label="Current Weight (kg)"
            type="number"
            variant="outlined"
            fullWidth
            name="currentWeight"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
          />
          <TextField
            label="Threshold Weight (kg)"
            type="number"
            variant="outlined"
            fullWidth
            name="thresholdWeight"
            value={thresholdWeight}
            onChange={(e) => setThresholdWeight(e.target.value)}
          />
          <TextField
            label="Reminder Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            fullWidth
            name="reminderDate"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-700"
            onClick={() => isEdit ? updateReminder({ id, itemName, currentWeight, thresholdWeight, reminderDate }) :
              addReminder({ id, itemName, currentWeight, thresholdWeight, reminderDate })}
          >
            {
              isEdit ? 'Update Reminder' : 'Add Reminder'
            }
          </Button>
        </Box>
      </Paper>

      {/* Reminders List */}
      {/* {<Box className="w-full max-w-2xl space-y-4">
        {reminders.map((reminder) => (
          <Card key={reminder._id} className="shadow-lg">
            <CardContent className="flex items-center justify-between">
              <Box>
                <Typography variant="h6" className="text-gray-800">
                  {reminder.itemName}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Current Weight: {reminder.currentWeight}kg | Threshold: {reminder.thresholdWeight}kg
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  Reminder Date: {new Date(reminder.reminderDate).toLocaleDateString()}
                </Typography>
              </Box>
              <IconButton onClick={() => deleteReminder(reminder._id)} color="error">
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Box>} */}
    </Box>
  );
};

export default ReminderForm;