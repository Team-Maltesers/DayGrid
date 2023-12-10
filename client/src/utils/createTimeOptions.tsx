type Hours = {
  text: string;
  hour: number;
};

function create24HoursArray() {
  const hours: Array<Hours> = [];
  for (let i = 0; i < 12; i++) {
    const hour = i;
    const item = { text: `오전 ${i === 0 ? 12 : i}`, hour };
    hours.push(item);
  }
  for (let i = 0; i < 12; i++) {
    const hour = i === 0 ? 12 : i + 12;
    const item = { text: `오후 ${i === 0 ? 12 : i}`, hour };
    hours.push(item);
  }
  return hours;
}

const hours24 = create24HoursArray();

export default function createTimeOptions(): Array<{ hour: number; minute: string; text: string }> {
  const minutes = ["00", "15", "30", "45"];

  const times: Array<{ hour: number; minute: string; text: string }> = [];
  hours24.forEach((h) => {
    minutes.forEach((m) => {
      times.push({
        hour: h.hour,
        minute: m,
        text: `${h.text}:${m}`,
      });
    });
  });
  return times;
}
