import { QueryClient } from "@tanstack/react-query";
import { FormData } from "../components/SignUpForm";
import { LoginFormData } from "../components/LoginForm";
import { PostPlanData } from "../ts/PlanData";
import axios from "axios";
import store from "../store/store";
import logout from "./logout";
import { setToken } from "../store/auth/authSlice";
export const queryClient = new QueryClient();

const instance = axios.create({
  baseURL: process.env.BASE_URL,
});

instance.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers["Authorization"] = "Bearer " + token["accessToken"];
  }
  return config;
});
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const access_token = await refreshAccessToken();
        store.dispatch(setToken(access_token));
        return instance(originalRequest);
      } catch {
        logout();
      }
    }

    return Promise.reject(error);
  },
);

async function refreshAccessToken() {
  try {
    const response = await instance.get(`/refresh`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function signup(eventData: FormData) {
  try {
    const response = await instance.post(`/signup`, eventData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function login(eventData: LoginFormData) {
  try {
    const response = await instance.post(`/login`, eventData, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function info() {
  try {
    const response = await instance.get(`/info`);
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
  signal?: AbortSignal;
}) {
  if (!id) {
    throw new Error("id is required");
  }
  try {
    const response = await instance.get(`/diary/${id}`, { signal });
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
    const response = await instance.delete(`/diary/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function fetchDiaryList({ page, signal }: { page: number; signal: AbortSignal }) {
  try {
    const response = await instance.get(`/diary?page=${page}`, { signal });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function imageApi({ img }: { img: File }) {
  const formData = new FormData();
  formData.append("img", img);

  const response = await instance.post(`/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}

export async function postDiary({ title, content }: { title: string; content: string }) {
  const response = await instance.post("/diary", {
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
    const response = await instance.get(`/gallery?page=${page}`, {
      signal,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateDiary({
  id,
  title,
  content,
}: {
  id: number;
  title: string;
  content: string;
}) {
  try {
    const response = await instance.put(`/diary/${id}`, { title, content });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchPlans({ start, end }: { start: Date; end: Date }) {
  try {
    const response = await instance.get(`/calendar`, {
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
    const response = await instance.post(`/calendar`, {
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
    const response = await instance.patch(`/calendar`, {
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
    const response = await instance.delete(`/calendar`, {
      params: { id: id },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchDday() {
  try {
    const response = await instance.get(`/calendar/dday`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchUserInfo() {
  try {
    const response = await instance.get(`/my-page`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function editUserInfo({
  name,
  password,
  birthday,
}: {
  name?: string;
  password?: string;
  birthday?: string;
}) {
  try {
    let response;
    if (name) {
      response = await instance.patch(`/my-page`, {
        name: name,
      });
    } else if (password) {
      response = await instance.patch(`/my-page`, {
        password: password,
      });
    } else if (birthday) {
      response = await instance.patch(`/my-page`, {
        birthday: birthday,
      });
    } else {
      return "입력된 정보가 없습니다.";
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUserInfo() {
  try {
    const response = await instance.delete(`/my-page`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
