import { QueryClient } from "@tanstack/react-query";
import { SignupFormData } from "../components/SignUpForm";
import { LoginFormData } from "../components/LoginForm";
import { PostPlanData } from "../ts/PlanData";
import axios from "axios";
import store from "../store/store";
import { setToken } from "../store/auth/authSlice";
export const queryClient = new QueryClient();

const instance = axios.create({
  baseURL: process.env.BASE_URL,
});

instance.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response.data.message);
    if (
      error.response.status === 401 &&
      error.response.data.message === "hi" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const access_token = await refreshAccessToken();
        store.dispatch(setToken(access_token.accessToken));
        return instance(originalRequest);
      } catch {
        logout();
      }
    } else if (error.response.status === 401) {
      logout();
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

export async function signup(eventData: SignupFormData) {
  try {
    const response = await instance.post(`/signup`, eventData, {
      withCredentials: true,
    });
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
export async function check() {
  try {
    const response = await instance.get(`/check`, { withCredentials: true });
    return response;
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
    const response = await instance.get(`/diary/${id}`, { signal, withCredentials: true });
    const content = {
      title: response.data.title,
      createdAt: response.data.createdAt,
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
    const response = await instance.delete(`/diary/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function fetchDiaryList({ page, signal }: { page: number; signal: AbortSignal }) {
  try {
    const response = await instance.get(`/diary?page=${page}`, { signal, withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function imageApi({ img }: { img: File }) {
  const formData = new FormData();
  formData.append("img", img);
  const token = store.getState().auth.accessToken;
  const response = await fetch(`${process.env.BASE_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function postDiary({ title, content }: { title: string; content: string }) {
  const response = await instance.post(
    "/diary",
    {
      title: title,
      content: content,
    },
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export async function logout() {
  const response = await instance.get("/logout", { withCredentials: true });
  if (response.status === 200) {
    window.location.href = "/";
  }
  return response;
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
      withCredentials: true,
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
    const response = await instance.put(
      `/diary/${id}`,
      { title, content },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchPlans({ start, end }: { start: Date; end: Date }) {
  try {
    const response = await instance.get(`/calendar/plan`, {
      params: { start: new Date(start).toISOString(), end: new Date(end).toISOString() },
      withCredentials: true,
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
    const response = await instance.post(
      `/calendar/plan`,
      {
        title: title,
        description: description,
        date: date,
        startTime: startTime,
        endTime: endTime,
        ddayChecked: ddayChecked,
        color: color,
      },
      {
        withCredentials: true,
      },
    );
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
    const response = await instance.patch(
      `/calendar/plan/${id}`,
      {
        title: data.title,
        description: data.description,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        ddayChecked: data.ddayChecked,
        color: data.color,
      },
      {
        withCredentials: true,
      },
    );
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
    const response = await instance.delete(`/calendar/plan/${id}`, {
      params: { id: id },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchDday() {
  try {
    const response = await instance.get(`/calendar/dday`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchUserInfo() {
  try {
    const response = await instance.get(`/my-page`, {
      withCredentials: true,
    });
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
      response = await instance.patch(
        `/my-page`,
        {
          name: name,
        },
        {
          withCredentials: true,
        },
      );
    } else if (password) {
      response = await instance.patch(
        `/my-page`,
        {
          password: password,
        },
        {
          withCredentials: true,
        },
      );
    } else if (birthday) {
      response = await instance.patch(
        `/my-page`,
        {
          birthday: birthday,
        },
        {
          withCredentials: true,
        },
      );
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
    const response = await instance.delete(`/my-page`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      logout();
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}
