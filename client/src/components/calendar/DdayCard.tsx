import React from "react";
import classes from "../../styles/calendar/Dday.module.css";
import cake from "../../assets/image/d-day/cake.png";

function DdayCard(): JSX.Element {
  return (
    <div className={classes.dday__card_con}>
      <div className={classes.dday__card_top}>
        <img src={cake} />
        <div>D - 00</div>
      </div>
      <div className={classes.dday__card_bottom}>D-day Content</div>
    </div>
  );
}

export default DdayCard;
