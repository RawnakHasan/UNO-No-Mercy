import App from "@/App";
import { CreateRoom, JoinRoom, Lobby, Docs, CheckEmail } from "@/pages";
import { createBrowserRouter } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthPage } from "@/auth/AuthPage";
import Layout from "./Layout";

export const router = createBrowserRouter([
  { path: "/signUp", element: <AuthPage /> },
  { path: "/signIn", element: <AuthPage /> },
  { path: "/check-email", element: <CheckEmail /> },
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/docs", element: <Docs /> },
      { path: "/", element: <App /> },
      { path: "/create", element: <CreateRoom /> },
      { path: "/join", element: <JoinRoom /> },
      { path: "/lobby/:roomCode", element: <Lobby /> },
    ],
  },
]);
