import { useState, useContext } from "react";
import MyCalendar from "./calenders/MyCalendar";
import AxiosInstance from "./AxiosInstance";
import Box from "@mui/material/Box";
import MyModal from "./utils/MyModal";
import { EventsContext } from "../App";

const Calendar = () => {
    const [open, setOpen] = useState(false);

    const { setEvents } = useContext(EventsContext);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleAddEvent = async (newEvent) => {
        try {
            const response = await AxiosInstance.post("events/", newEvent);

            const { id, summary, start, end } = response.data.event;

            const transformedEvent = {
                id,
                title: summary,
                start: start?.dateTime || start,
                end: end?.dateTime || end
            };

            setEvents((prev) => [...prev, transformedEvent]);
            setOpen(false);
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    return (
        <>
            <MyModal
                open={open}
                handleClose={handleClose}
                handleAddEvent={handleAddEvent}
            />

            <Box sx={{ boxShadow: 3, padding: "20px" }}>
                <MyCalendar dayClickAction={handleOpen} />
            </Box>
        </>
    );
};

export default Calendar;
