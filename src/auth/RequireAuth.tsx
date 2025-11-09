import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
import CircularProgress from "@mui/material/CircularProgress";

export const RequireAuth: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <CircularProgress />;

  if (!user) {
    return <Navigate to="/authorization" state={{ from: location }} replace />;
  }

  return children;
};
