import React from "react";
import DdayCard from "./DdayCard";
import classes from "../../styles/calendar/Dday.module.css";

const Dday = (): JSX.Element => {
  return (
    <div className={classes.dday__con}>
      <div className={classes.dday__title}>D - DAY</div>
      <div className={classes.dday__contents}>
        <DdayCard />
      </div>
    </div>
  );
};

export default Dday;
