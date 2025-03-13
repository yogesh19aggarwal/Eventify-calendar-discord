import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Calendar from "./components/Calendar.jsx";
import EventDetails from "./components/EventDetails";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

export const EventsContext = createContext();

function App() {
  const [events, setEvents] = useState([]);

  return (
    <>
      <EventsContext.Provider value={{ events, setEvents }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/eventdetails/:id/:name"
            element={
              <ProtectedRoute>
                <EventDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </EventsContext.Provider>
    </>
  );
}

export default App;
