import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { useNavigate } from 'react-router-dom';
import interactionPlugin from '@fullcalendar/interaction';
import { useContext, memo } from 'react';
import { EventsContext } from '../../App';

const MyCalendar = ({ dayClickAction }) => {

  const { events } = useContext(EventsContext);

  const navigate = useNavigate();

  const eventClick = (data) => {
    navigate(`/eventdetails/${data.event.id}/${data.event.title}`);
  };

  return (
    <FullCalendar
      height="auto"
      contentHeight="auto"
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, multiMonthPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventClick={eventClick}
      dateClick={dayClickAction}

      views={{
        multiMonth3: {
          type: 'multiMonth',
          duration: { months: 3 },
          titleFormat: { month: 'short', year: 'numeric' },
          columnHeaderFormat: { weekday: 'short' },
          buttonText: "3 Months"
        }
      }}

      headerToolbar={
        {
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth, timeGridWeek, listDay, multiMonth3'
        }
      }
      eventTimeFormat={{
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }}
    />
  )
};

export default memo(MyCalendar);