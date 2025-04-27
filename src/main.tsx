import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App.tsx";
import { SignIn } from "./pages/SignIn.tsx";
import { SignUp } from "./pages/SignUp.tsx";
import "./lib/i18n.ts";
import { Dashboard } from "./pages/Dashboard.tsx";
import { PrivateRoute } from "./auth/PrivateRoute.tsx"
import { Toaster } from 'sonner';
import { AwaitVerification } from "./pages/AwaitVerification.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    )
  },
  {
    path: "/verify-email",
    element: (
      <AwaitVerification/>
    )
  }
]);

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <StrictMode>
      <RouterProvider router={router} />
      <Toaster theme="dark" richColors position="top-right" duration={2000}/>
    </StrictMode>
  </ThemeProvider>
);
