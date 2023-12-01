import { QueryClient } from "@tanstack/react-query";
import { FormData } from "../components/SignUpForm";
import { LoginFormData } from "../components/LoginForm";
import { PostPlanData } from "../ts/PlanData";
import axios from "axios";
import store from "../store/store";
export const queryClient = new QueryClient();

const instance = axios.create({
  baseURL: process.env.BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  async function (error) {
    /*
    const originalRequest = error.config;

    // 1. Unauthorized 상태이고, 이전에 토큰 갱신 요청이 아니었을 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 토큰 갱신 요청 플래그를 true로 설정

      // 2. 토큰 갱신 요청
      const access_token = await refreshAccessToken();

      // 3. 새로운 토큰을 headers에 설정
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;

      // 4. 이전에 실패했던 요청을 다시 보내기
      return instance(originalRequest);
    }
*/
    return Promise.reject(error);
  },
);
/*
async function refreshAccessToken() {
  // 여기에 리프레시 토큰을 이용하여 새로운 엑세스 토큰을 발급받는 API 요청 로직을 작성하세요.
  // 발급받은 엑세스 토큰을 반환해야 합니다.
}
*/

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
    const response = await instance.post(`/login`, eventData);
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

export async function fetchUserInfo({ id }: { id: number }) {
  try {
    const response = await axios.get(`/my-page`, {
      params: { id: id },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function editUserInfo({
  id,
  name,
  password,
  birthday,
}: {
  id: number;
  name?: string;
  password?: string;
  birthday?: string;
}) {
  try {
    let response;
    if (name) {
      response = await instance.patch(`/my-page`, {
        id: id,
        name: name,
      });
    } else if (password) {
      response = await instance.patch(`/my-page`, {
        id: id,
        password: password,
      });
    } else if (birthday) {
      response = await instance.patch(`/my-page`, {
        id: id,
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

export async function deleteUserInfo({ id }: { id: number | undefined }) {
  if (!id) {
    throw new Error("id is required");
  }
  try {
    const response = await instance.delete(`/my-page`, { params: { id: id } });
    return response.data;
  } catch (error) {
    throw error;
  }
}
