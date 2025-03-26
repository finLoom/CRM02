// src/app/AppRouter.tsx
import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { routes } from "./routes";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {routes.map((route) => {
          // Create the element by instantiating the component
          const RouteComponent = route.component;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<RouteComponent />}
            />
          );
        })}

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;