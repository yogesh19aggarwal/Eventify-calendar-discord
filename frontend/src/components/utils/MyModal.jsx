import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import { convertToISOWithOffset } from "./convertToIso.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const MyModal = ({ open, handleClose, handleAddEvent }) => {

  const [summary, setSummary] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [timeZone, setTimeZone] = useState("Asia/Kolkata");

  // const convertToISOWithOffset = (dateTime) => {
  //   if (!dateTime) return "";
  
  //   const localDate = new Date(dateTime);
  
  //   const year = localDate.getFullYear();
  //   const month = String(localDate.getMonth() + 1).padStart(2, "0");
  //   const day = String(localDate.getDate()).padStart(2, "0");
  //   const hour = String(localDate.getHours()).padStart(2, "0");
  //   const minute = String(localDate.getMinutes()).padStart(2, "0");
  //   const second = String(localDate.getSeconds()).padStart(2, "0");
  
  //   const timezoneOffset = -localDate.getTimezoneOffset();
  //   const offsetHours = String(Math.floor(Math.abs(timezoneOffset / 60))).padStart(2, "0");
  //   const offsetMinutes = String(Math.abs(timezoneOffset % 60)).padStart(2, "0");
  //   const offsetSign = timezoneOffset >= 0 ? "+" : "-";
  
  //   const formattedOffset = `${offsetSign}${offsetHours}:${offsetMinutes}`;
  
  //   return `${year}-${month}-${day}T${hour}:${minute}:${second}${formattedOffset}`;
  // };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      summary,
      start: {
        dateTime: convertToISOWithOffset(startDateTime),
        timeZone,
      },
      end: {
        dateTime: convertToISOWithOffset(endDateTime),
        timeZone,
      },
    };

    await handleAddEvent(newEvent);
    setSummary("");
    setStartDateTime("");
    setEndDateTime("");
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={style}>

        <Typography id="modal-title" variant="h6" gutterBottom>
          Add New Event
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Event Summary"
            variant="outlined"
            margin="normal"
            required
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <TextField
            fullWidth
            label="Start Date & Time"
            type="datetime-local"
            variant="outlined"
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
          />
          <TextField
            fullWidth
            label="End Date & Time"
            type="datetime-local"
            variant="outlined"
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
          />
          <TextField
            fullWidth
            select
            label="Time Zone"
            variant="outlined"
            margin="normal"
            required
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
          >
            <MenuItem value="Asia/Kolkata">Asia/Kolkata (IST)</MenuItem>
            <MenuItem value="UTC">UTC</MenuItem>
            <MenuItem value="America/New_York">America/New_York (EST)</MenuItem>
            <MenuItem value="Europe/London">Europe/London (GMT)</MenuItem>
          </TextField>

          <Box mt={2} display="flex" justifyContent="space-between">
            <Button onClick={handleClose} variant="outlined" color="error">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Add Event
            </Button>
          </Box>

        </form>
      </Box>
    </Modal>
  );
};

export default MyModal;
