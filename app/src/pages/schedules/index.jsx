import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { enUS } from "date-fns/locale/en-US";
import { getSchedules } from "../../api/employeeSchedule";
import { parseISO, startOfWeek, format, parse, getDay } from "date-fns";
import { useState, useEffect } from "react";
import { ADD_SCHEDULE_ROUTE } from "../../constants/routes";
import { Link } from "react-router-dom";
import { RiAddLargeLine } from "react-icons/ri";

const locales = {
  en: enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const SchedulesPage = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(Views.WEEK);
  const [currentDate, setCurrentDate] = useState(new Date()); // Track the current date

  useEffect(() => {
    getSchedules()
      .then((res) => {
        const formattedEvents = res.data.map((schedule) => ({
          id: schedule.id,
          title: schedule.user.name,
          start: parseISO(schedule.startDateTime),
          end: parseISO(schedule.endDateTime),
        }));

        setEvents(formattedEvents);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="py-10 bg-slate-100 min-h-svh  px-4 lg:px-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-center md:text-left text-2xl md:text-3xl font-semibold text-textColor">
            Staff Schedules
          </h2>

          <Link
            to={ADD_SCHEDULE_ROUTE}
            className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2 flex items-center"
          >
            Create new schedule
            <RiAddLargeLine className="ml-2" />
          </Link>
        </div>

        <div className="py-5">
          <Calendar
            date={currentDate}
            endAccessor="end"
            events={events}
            localizer={localizer}
            onNavigate={setCurrentDate}
            onView={setView}
            startAccessor="start"
            style={{ height: 500 }}
            view={view}
            views={["month", "week", "day"]}
          />
        </div>
      </div>
    </section>
  );
};

export default SchedulesPage;
