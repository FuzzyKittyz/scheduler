import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const dayMap = props.days.map((day) => {
    return (
      <ul>
        <DayListItem 
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  
      />
    </ul>
    );
  })
 return dayMap
};


