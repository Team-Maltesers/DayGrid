interface FetchPlanData {
  planId: number;
  date: string;
  startTime: number;
  endTime: number;
  title: string;
  description: string;
  ddayChecked: boolean;
  color: string;
}

interface PostPlanData {
  title: string;
  description: string;
  date: string;
  startTime: number;
  endTime: number;
  ddayChecked: boolean;
  color: string;
}

interface CalendarProps {
  planData: FetchPlanData[] | [];
}

interface PlanWriteModalFormProps {
  isStartTimeSelected: boolean;
  setIsStartTimeSelected: (value: boolean) => void;
  isEndTimeSelected: boolean;
  setIsEndTimeSelected: (value: boolean) => void;
  isColorOptionOpened: boolean;
  setIsColorOptionOpened: (value: boolean) => void;
}

interface DdayData {
  planId: number;
  title: string;
  date: string;
}

interface DdayCardProps {
  data: DdayData;
}

export {
  FetchPlanData,
  PostPlanData,
  CalendarProps,
  PlanWriteModalFormProps,
  DdayData,
  DdayCardProps,
};
