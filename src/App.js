import { Layout, Spin } from "antd";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import { useAuth } from "./global/context/AuthenticationContext";
import {
  AdminRouter,
  GuestRouter,
  ReceptionistRouter,
  SuperAdminRouter,
} from "./navigation/ExternalRouter.ts";

const { Content } = Layout;

function App() {
  const { isAuthenticated, profile, loading } = useAuth();

  return (
    <div className="App">
      <Main>
        {loading ? (
          <Spin size="large" fullscreen />
        ) : (
          <Routes>
            {!!isAuthenticated() ? (
              <Route path="/">
                {profile.isAdmin?.() &&
                  AdminRouter.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={<route.element />}
                    />
                  ))}
                {profile.isSuperAdmin?.() &&
                  SuperAdminRouter.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={<route.element />}
                    />
                  ))}
                {profile.isReceptionist?.() &&
                  ReceptionistRouter.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={<route.element />}
                    />
                  ))}

                <Route path="*" element={<Navigate to="/" />} />
              </Route>
            ) : (
              <Route path="/">
                {GuestRouter.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<route.element />}
                  />
                ))}
                <Route path="*" element={<Navigate to="/login" />} />
              </Route>
            )}
          </Routes>
        )}
      </Main>
    </div>
  );
}

export default App;
