import { QueryClient } from "@tanstack/react-query";
import { FormData } from "../components/SignUpForm";

export const queryClient = new QueryClient();

export async function createNewEvent(eventData: FormData) {
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
