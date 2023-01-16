import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(){
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data 
      }));
    });
}, [])

const setDay = day => setState({ ...state, day });

function bookInterview(id, interview) {

  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

   return axios
    .put(`/api/appointments/${id}`, { interview })
    .then(() => {setState({ ...state, appointments, days: updateSpots(state.day, false) })
   });
}

function deleteInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...state.appointments[id].interview}
  };
  appointment.interview.interviewer = null 
  appointment.interview.student = null 

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  return axios
    .delete(`api/appointments/${id}`)
    .then(() => { setState((prev) => ({ ...prev, appointments, days: updateSpots(state.day, true) }));
  });
}

const updateSpots = (day, update) => {
  const days = state.days;

  let daysIndex = -1;

  const dayUpdate = days.find((item, index) => {
    if (item.name === day) {
      daysIndex = index;
      return item;
    }
  })

  if (update) {
    dayUpdate.spots++
  } else {
    dayUpdate.spots--
  }

  days.splice(daysIndex, 1, dayUpdate);
  return days;
}

return {state, setDay, bookInterview, deleteInterview}
}
