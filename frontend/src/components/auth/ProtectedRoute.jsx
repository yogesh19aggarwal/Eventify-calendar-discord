import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AxiosInstance from "../AxiosInstance";
import { EventsContext } from "../../App";

const ProtectedRoute = ({ children }) => {
  const [isVerified, setIsVerified] = useState(null);

  const { setEvents } = useContext(EventsContext);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await AxiosInstance.get("/events");

        const transformedEvents = res.data.map(event => ({
          id: event.id,
          title: event.summary || "No Title",
          start: event.start?.dateTime,
          end: event.end?.dateTime,
        }));
        
        setEvents(transformedEvents);
        setIsVerified(true);
      } catch (error) {
        console.log(error);
        setIsVerified(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (isVerified === null) {
    return <div>Loading...</div>;
  }

  return isVerified ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
