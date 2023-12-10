import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDday } from "../../utils/http";
import { DdayData } from "../../ts/PlanData";
import DdayCard from "./DdayCard";
import classes from "../../styles/calendar/Dday.module.css";

function DdayList(): JSX.Element {
  const { data } = useQuery<DdayData[]>({
    queryKey: ["ddayData"],
    queryFn: () => fetchDday(),
  });

  const newData = data?.filter((d) => new Date(d.date) > new Date());

  return (
    <div className={classes.dday__con}>
      <div className={classes.dday__title}>D - DAY</div>
      {newData?.length ? (
        <div className={classes.dday__contents}>{newData?.map((v) => <DdayCard data={v} />)}</div>
      ) : null}
    </div>
  );
}

export default DdayList;
