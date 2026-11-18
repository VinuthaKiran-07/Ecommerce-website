
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{
          from: `${location.pathname}${location.search}${location.hash}`,
        }}
        replace
      />
    );
  }

  return children;
}
