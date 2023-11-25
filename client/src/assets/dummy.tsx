interface Dummy {
  id: number;
  date: string;
  startTime: number;
  endTime: number;
  title: string;
  description: string;
  ddayChecked: boolean;
  color: string;
}

const dummy: Dummy[] = [
  {
    id: 1,
    date: "2023-11-21T15:00:00.000Z",
    startTime: 48,
    endTime: 52,
    title: "테스트 일정1",
    description: "테스트 일정1",
    ddayChecked: false,
    color: "#FF9494",
  },
  {
    id: 2,
    date: "2023-11-22T00:00:00.000Z",
    startTime: 48,
    endTime: 56,
    title: "테스트 일정2",
    description: "테스트 일정2",
    ddayChecked: true,
    color: "#FFD494",
  },
  {
    id: 3,
    date: "2023-11-30T00:00:00.000Z",
    startTime: 40,
    endTime: 64,
    title: "테스트 일정3",
    description: "테스트 일정3",
    ddayChecked: false,
    color: "#BAE7AB",
  },
  {
    id: 4,
    date: "2023-11-30T00:00:00.000Z",
    startTime: 44,
    endTime: 49,
    title: "테스트 일정4",
    description: "테스트 일정4",
    ddayChecked: false,
    color: "#FF9494",
  },
  {
    id: 5,
    date: "2023-11-21T15:00:00.000Z",
    startTime: 36,
    endTime: 44,
    title: "테스트 일정5",
    description: "테스트 일정5",
    ddayChecked: true,
    color: "#ACE9F1",
  },
  {
    id: 6,
    date: "2023-11-21T15:00:00.000Z",
    startTime: 60,
    endTime: 68,
    title: "테스트 일정6",
    description: "테스트 일정6",
    ddayChecked: true,
    color: "#BCA5ED",
  },
  {
    id: 7,
    date: "2023-11-26T00:00:00.000Z",
    startTime: 48,
    endTime: 56,
    title: "테스트 일정7",
    description: "테스트 일정7",
    ddayChecked: false,
    color: "#FFD494",
  },
  {
    id: 8,
    date: "2023-12-02T00:00:00.000Z",
    startTime: 52,
    endTime: 56,
    title: "테스트 일정8",
    description: "테스트 일정8",
    ddayChecked: true,
    color: "#BAE7AB",
  },
];

export default dummy;
