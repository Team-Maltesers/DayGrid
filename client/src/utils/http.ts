import { QueryClient } from "@tanstack/react-query";
import { FormData } from "../components/SignUpForm";
import { LoginFormData } from "../components/LoginForm";
import { PostPlanData } from "../ts/PlanData";
import axios from "axios";

export const queryClient = new QueryClient();

export async function signup(eventData: FormData) {
  try {
    const response = await axios.post(`http://localhost:3000/signup`, eventData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function login(eventData: LoginFormData) {
  try {
    const response = await axios.post(`http://localhost:3000/login`, eventData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchDiaryDetail({
  id,
  signal,
}: {
  id: number | undefined;
  signal: AbortSignal;
}) {
  if (!id) {
    throw new Error("id is required");
  }
  try {
    const response = await axios.get(`http://localhost:3000/diary/${id}`, { signal });
    const content = {
      title: response.data.title,
      date: response.data.date,
      content: response.data.content,
    };
    return content;
  } catch (error) {
    throw error;
  }
}

export async function deleteDiary({ id }: { id: number | undefined }) {
  if (!id) {
    throw new Error("id is required");
  }
  try {
    const response = await axios.delete(`http://localhost:3000/diary/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function fetchDiaryList({ page, signal }: { page: number; signal: AbortSignal }) {
  try {
    const response = await axios.get(`http://localhost:3000/diary?page=${page}`, { signal });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function imageApi({ img }: { img: File }) {
  // FormData 객체 생성
  const formData = new FormData();
  formData.append("img", img);

  // 서버로 이미지 업로드
  const response = await axios.post(`http://localhost:3000/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // 서버로부터 이미지 URL 응답 받기
  return response;
}

export async function postDiary({ title, content }: { title: string; content: string }) {
  const response = await axios.post("http://localhost:3000/diary", {
    title: title,
    content: content,
  });
  return response.data;
}

export async function fetchDiaryWithImages({
  page,
  signal,
}: {
  page: number;
  signal: AbortSignal;
}) {
  try {
    const response = await axios.get(`http://localhost:3000/diary-with-images?page=${page}`, {
      signal,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchPlans({ start, end }: { start: Date; end: Date }) {
  try {
    const response = await axios.get(`http://localhost:3000/calendar`, {
      params: { start: new Date(start).toISOString(), end: new Date(end).toISOString() },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function postPlan({
  title,
  description,
  date,
  startTime,
  endTime,
  ddayChecked,
  color,
}: PostPlanData) {
  try {
    const response = await axios.post(`http://localhost:3000/calendar`, {
      title: title,
      description: description,
      date: date,
      startTime: startTime,
      endTime: endTime,
      ddayChecked: ddayChecked,
      color: color,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function editPlan({ id, data }: { id: number | undefined; data: PostPlanData }) {
  if (!id) {
    throw new Error("id is required");
  }
  try {
    const response = await axios.patch(`http://localhost:3000/calendar`, {
      id: id,
      title: data.title,
      description: data.description,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      ddayChecked: data.ddayChecked,
      color: data.color,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deletePlan({ id }: { id: number | undefined }) {
  if (!id) {
    throw new Error("id is required");
  }
  try {
    const response = await axios.delete(`http://localhost:3000/calendar`, { params: { id: id } });
    return response.data;
  } catch (error) {
    throw error;
  }
}
