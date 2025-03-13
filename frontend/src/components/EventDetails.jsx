import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AxiosInstance from './AxiosInstance';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from "@mui/material/MenuItem";
import { EventsContext } from '../App';
import { convertToISOWithOffset } from './utils/convertToIso.js';

const EventDetails = () => {

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [timeZone, setTimeZone] = useState("Asia/Kolkata");

  const { setEvents } = useContext(EventsContext);

  const MyParams = useParams();
  const MyId = MyParams.id;
  const navigate = useNavigate();


  const formatDateToLocal = (dateTime) => {
    if (dateTime && !isNaN(new Date(dateTime))) {
      const localDateObj = new Date(dateTime);
  
      const offset = localDateObj.getTimezoneOffset() * 60000;
      const indiaTime = new Date(localDateObj.getTime() + offset + (5.5 * 60 * 60 * 1000));
  
      const year = indiaTime.getFullYear();
      const month = String(indiaTime.getMonth() + 1).padStart(2, '0');
      const day = String(indiaTime.getDate()).padStart(2, '0');
      const hours = String(indiaTime.getHours()).padStart(2, '0');
      const minutes = String(indiaTime.getMinutes()).padStart(2, '0');
  
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    return null;
  };

  useEffect(() => {
    AxiosInstance.get(`events/${MyId}`)
      .then((res) => {
        const { summary, start, end } = res.data;

        setSummary(summary);

        const localStart = formatDateToLocal(start?.dateTime);
        const localEnd = formatDateToLocal(end?.dateTime);

        if (localStart) setStart(localStart);
        else console.error("Invalid start date:", start);

        if (localEnd) setEnd(localEnd);
        else console.error("Invalid end date:", end);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
        setLoading(false);
      });
  }, [MyId]);

  const handleEdit = () => {

    const newEvent = {
      summary,
      start: {
        dateTime: convertToISOWithOffset(start),
        timeZone,
      },
      end: {
        dateTime: convertToISOWithOffset(end),
        timeZone,
      },
    };

    AxiosInstance.put(`events/${MyId}`, newEvent)
      .then(() => {
        navigate('/calendar');
      })
      .catch((error) => {
        console.error("Error updating event:", error);
      });
  }

  const handleDelete = () => {
    AxiosInstance.delete(`events/${MyId}`).then(() => {
      setEvents((prev) => prev.filter((event) => event.id != MyId));
      navigate('/calendar');
    });
  }

  // const events = {
  //   summary: 'Hello',
  //   start: new Date("2025-03-10T06:15:00+05:30").toISOString().slice(0, 16),
  //   end: new Date("2025-03-11T07:16:00+05:30").toISOString().slice(0, 16)
  // };

  if (loading) return <h3>Loading the data...</h3>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>

      <Box sx={{ width: '50%', boxShadow: 3, padding: '20px', marginBottom: '20px' }}>
        <TextField label="Name" value={summary} onChange={(e) => setSummary(e.target.value)} fullWidth />
      </Box>

      <Box sx={{ width: '50%', boxShadow: 3, padding: '20px', marginBottom: '20px' }}>
        <TextField
          label="Start Date and Time"
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          fullWidth
        />
      </Box>

      <Box sx={{ width: '50%', boxShadow: 3, padding: '20px', marginBottom: '20px' }}>
        <TextField
          label="End Date and Time"
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          fullWidth
        />
      </Box>

      <Box sx={{ width: '50%', boxShadow: 3, padding: '20px', marginBottom: '20px' }}>
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
      </Box>


      <div>
        <Button variant="contained" color="primary" onClick={handleEdit} sx={{ marginRight: '10px' }}>Save</Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  )
}

export default EventDetails;
