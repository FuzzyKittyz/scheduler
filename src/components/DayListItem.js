import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss"

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = function(){
    let message;
    if (props.spots === 0) {
      message = `no spots remaining`
    }
    if (props.spots === 1) {
      message = `1 spot remaining`
    }
    if (props.spots > 1) {
      message = `${props.spots} spots remaining`
    }
    return message
  }
  return (
    <li 
    className={dayClass} 
    onClick={() => props.setDay(props.name)}
    data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}