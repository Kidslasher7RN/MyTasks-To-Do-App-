import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";
import Home from "./components/pages/Home.jsx";
import TaskView from "./components/pages/TaskView.jsx";
import ErrorPage from "./components/pages/ErrorPage.jsx";
import AuthForm from "./components/fragments/authForm.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";

const router = createBrowserRouter([
  {path: "/", element: <Home />, errorElement: <ErrorPage />},
  {path: "/login", element: <AuthForm authType={"login"} />},
  {path: "/register", element: <AuthForm authType={"register"} />},
  {path: "/task/:id", element: <TaskView />},
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />,
  </AuthProvider>,

  //</StrictMode>
);
