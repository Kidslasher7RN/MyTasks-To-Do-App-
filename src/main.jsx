import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";
import Home from "./components/pages/Home.jsx";
import TaskView from "./components/pages/TaskView.jsx";
import ErrorPage from "./components/pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {path: "/", element: <Home />, errorElement: <ErrorPage />},
  {path: "/task/:id", element: <TaskView />},
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RouterProvider router={router} />,
  //</StrictMode>
);
