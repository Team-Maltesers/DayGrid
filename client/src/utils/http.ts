import { QueryClient } from "@tanstack/react-query";
import { FormData } from "../components/SignUpForm";
import { LoginFormData } from "../components/LoginForm";

export const queryClient = new QueryClient();

export async function signup(eventData: FormData) {
  const response = await fetch(`http://localhost:3000/signup`, {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const error = new Error("An error occurred while creating the event");
    throw error;
  }
  const event = await response.json();
  return event;
}

export async function login(eventData: LoginFormData) {
  const response = await fetch(`http://localhost:3000/login`, {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const error = new Error("An error occurred while creating the event");
    throw error;
  }
  const event = await response.json();
  return event;
}
