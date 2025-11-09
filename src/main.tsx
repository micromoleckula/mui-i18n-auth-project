import React, { StrictMode } from "react";
import "./i18n";
import App from "./App";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { RequireAuth } from "./auth/RequireAuth";
import { routes } from "./app/routes";
import { ThemeModeProvider } from "./theme/ThemeModeProvider";

export function Root() {
  return (
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <ThemeModeProvider>
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/authorization" replace />}
              />
              <Route path="/app" element={<App />} />
              {routes.map((r) => (
                <Route
                  key={r.path}
                  path={r.path}
                  element={
                    r.protected ? (
                      <RequireAuth>
                        {React.createElement(r.element)}
                      </RequireAuth>
                    ) : (
                      React.createElement(r.element)
                    )
                  }
                />
              ))}
              <Route
                path="*"
                element={<Navigate to="/authorization" replace />}
              />
            </Routes>
          </ThemeModeProvider>
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
