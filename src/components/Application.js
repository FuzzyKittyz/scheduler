import "components/Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";
import React from "react";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/ selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  } = useApplicationData();

const dailyAppointments = getAppointmentsForDay(state, state.day)

const schedule = dailyAppointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);

  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={getInterviewersForDay(state, state.day)}
      bookInterview={bookInterview}
      deleteInterview={deleteInterview}
    />
  );
});

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}<img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList 
    days={state.days}
    day={state.day}
    setDay={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {schedule}
        <Appointment time="5pm" />
      </section>
    </main>
  );
}
