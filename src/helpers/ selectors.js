let getAppointmentsForDay = function(state, day) {
  let appointmentsArr = [];
  if (state.days.length > 0){
    let findAppt = state.days.find(dayAppt => dayAppt.name === day)
    if(findAppt){
    for (let appointment of findAppt.appointments){
      appointmentsArr.push(state.appointments[appointment])
    }
  }
}
  return appointmentsArr
}

let getInterview = function(state, interview){
  if(interview === null) {
    return null;
  }
  
  let interviewersObj = {
    student: interview.student,
    interviewer: {
      id: state.interviewers[interview.interviewer].id,
      name: state.interviewers[interview.interviewer].name,
      avatar: state.interviewers[interview.interviewer].avatar
    }
  }
  return interviewersObj;
}

function getInterviewersForDay(state, day) {
  const filteredInterviewers = state.days.filter(d => d.name === day);
  let interviewers = [];

  if (filteredInterviewers.length) {
    interviewers = filteredInterviewers[0].interviewers.map(x => state.interviewers[x]);
  }
  return interviewers;
}

export {
  getAppointmentsForDay, getInterview, getInterviewersForDay
}