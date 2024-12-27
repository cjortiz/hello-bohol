import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import * as Screens from "./screens";
import { PATHS } from "./config";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.HOME.path} element={<Screens.HomePage />} />

        {/* Not Found Route */}
        {/* <Route path={PATHS.NOT_FOUND.path} element={<Screens.PageNotFound />} /> */}

        {/* Redirect to Not Found for unrecognized routes */}
        {/* <Route path="*" element={<Navigate to={PATHS.NOT_FOUND.path} />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
