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


const updateSpots = function (id, appointments) {
  // find the day that we want to book or cancel our appointment and see if it includes the
  // appointment id 
  const foundDay = state.days.find((day) => day.appointments.includes(id));
  const foundIndex = state.days.findIndex((day) => day.appointments.includes(id));

  let spots = 0;
  if (!foundDay) {
    return state.days;
  }

  for (const id of foundDay.appointments) {
    if (appointments[id].interview === null) {
      spots++
    }
  }
  const days = [
    ...state.days
  ]
  days[foundIndex] = { ...days[foundIndex], spots }
  return days
}

function bookInterview(id, interview) {
  //function used to take a given object consiting of the interviewer selected and the name give and updating the schdule(and state) to have that appointment booked 
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
    .then(() => {setState({ ...state, appointments, days: updateSpots(id, appointments) })
   });
}

function deleteInterview(id) {
  //function that takes the ID of a given appointment and deletes the appointment while updating the state
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  }
  const days = updateSpots(id, appointments)
  const interviewDataFromAPI = `/api/appointments/${id}`;
  return axios.delete(interviewDataFromAPI)
    .then(() => {
      setState((prev) => {
        return {
          ...prev, appointments, days
        }
      })
    })
}

return {state, setDay, bookInterview, deleteInterview}
}
