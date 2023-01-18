import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm"
import Status from "./Status";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const EDIT = "EDIT";
  const DELETING = "DELETING"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  
    transition(SAVING);
    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true))
      }

  function deleteAppointment() {
    transition(DELETING);
    props
     .deleteInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(error => transition(ERROR_DELETE, true));
  }

  return(
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
       <Show
       student={props.interview.student}
       interviewer={props.interview.interviewer}
       onDelete={() => transition(CONFIRM)}
       onEdit={() => transition(EDIT)}
        />
       )}   
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} /> }
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={deleteAppointment} />}
      {mode === SAVING && <Status message = 'Saving' />}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={back} onSave={save} />  }
      {mode === DELETING && <Status message='Deleting'/>}
      {mode === ERROR_SAVE && <Error message='Could not Save Appointment' onClose={() => transition(EMPTY)} /> }
      {mode === ERROR_DELETE && <Error message='Could not Delete Appointment' onClose={() => transition(SHOW)} /> }

  
    </article>
  )
}