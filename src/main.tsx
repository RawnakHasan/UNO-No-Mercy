import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@/theme/theme-provider.tsx";
import { CreateRoom, JoinRoom, Lobby } from "@/pages";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/create", element: <CreateRoom /> },
  { path: "/join", element: <JoinRoom /> },
  { path: "/lobby/:roomCode", element: <Lobby /> },
]);

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
  </ThemeProvider>
);
