export function getAppointmentsForDay(state, day) {
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