import { QueryClientProvider } from "@tanstack/react-query";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import Info from "./pages/Info";
import Calendar from "./pages/Calendar";
import DiaryWrite from "./pages/DiaryWrite";
import DiaryList from "./pages/DiaryList";
import MyPage from "./pages/MyPage";
import { queryClient } from "./utils/http";
import RootLayout from "./pages/Root";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Navigate to="/info" replace /> },
      { path: "/info", element: <Info /> },
      {
        path: "/calendar",
        element: <Calendar />,
      },
      { path: "/diary-write", element: <DiaryWrite /> },
      { path: "/diary-list", element: <DiaryList /> },
      { path: "/my-page", element: <MyPage /> },
      { path: "*", element: <Navigate to="/404" replace /> },
      { path: "/404", element: <Error /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
