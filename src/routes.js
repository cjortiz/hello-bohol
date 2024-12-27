import { jsx as _jsx } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Screens from "./screens";
import { PATHS } from "./config";
export const AppRoutes = () => {
    return (_jsx(BrowserRouter, { children: _jsx(Routes, { children: _jsx(Route, { path: PATHS.HOME.path, element: _jsx(Screens.HomePage, {}) }) }) }));
};
