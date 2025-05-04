import { JSX } from "react";
import { Navigate } from "react-router-dom";

export function VerificationRoute({ children }: { children: JSX.Element }) {
  const justRegistered = sessionStorage.getItem("justRegistered") === "true";

  if (!justRegistered) {
    return <Navigate to="/" replace />;
  }

  return children;
}
