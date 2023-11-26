import { QueryClientProvider } from "@tanstack/react-query";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import InfoPage from "./pages/InfoPage";
import CalendarPage from "./pages/CalendarPage";
import DiaryWritePage from "./pages/DiaryWritePage";
import MyPage from "./pages/MyPage";
import { queryClient } from "./utils/http";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import DiaryListPage from "./pages/DiaryListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Navigate to="/info" replace /> },
      { path: "/info", element: <InfoPage /> },
      {
        path: "/calendar",
        element: <CalendarPage />,
      },
      { path: "/diary-write", element: <DiaryWritePage /> },
      { path: "/diary-list", element: <DiaryListPage /> },
      { path: "/my-page", element: <MyPage /> },
      { path: "*", element: <Navigate to="/404" replace /> },
      { path: "/404", element: <ErrorPage /> },
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
