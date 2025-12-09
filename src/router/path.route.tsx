import App from "@/App";
import { CreateRoom, JoinRoom, Lobby, Docs, CheckEmail } from "@/pages";
import { createBrowserRouter } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthPage } from "@/auth/AuthPage";

export const router = createBrowserRouter([
  { path: "/docs", element: <Docs /> },
  { path: "/signUp", element: <AuthPage /> },
  { path: "/signIn", element: <AuthPage /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create",
    element: (
      <ProtectedRoute>
        <CreateRoom />
      </ProtectedRoute>
    ),
  },
  {
    path: "/join",
    element: (
      <ProtectedRoute>
        <JoinRoom />
      </ProtectedRoute>
    ),
  },
  {
    path: "/lobby/:roomCode",
    element: (
      <ProtectedRoute>
        <Lobby />
      </ProtectedRoute>
    ),
  },
  {
    path: "/check-email",
    element: (
      <ProtectedRoute>
        <CheckEmail />
      </ProtectedRoute>
    ),
  },
]);
