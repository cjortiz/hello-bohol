import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import * as Screens from "./screens";
import { PATHS } from "./config";
import { Layout } from "./common/components";
import { observer } from "mobx-react-lite";
import { useStores } from "./common/models";

export const AppRoutes = observer(() => {
  const { backgroundImageStore } = useStores();
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.Main.path} element={<Layout />}>
          {/* Dashboard and Profile Routes */}
          <Route index element={<Navigate to={PATHS.HOME.path} />} />
          <Route path={PATHS.HOME.path} element={<Screens.HomePage />} />
          <Route
            path={PATHS.DESTINATION.path}
            element={<Screens.Destination />}
          />
          <Route
            path={`${PATHS.INNER.path}/:name`}
            element={<Screens.InnerPage />}
          />

          <Route path={PATHS.ABOUT.path} element={<Screens.About />} />
        </Route>
        {/* Not Found Route */}
        {/* <Route path={PATHS.NOT_FOUND.path} element={<Screens.PageNotFound />} /> */}

        {/* Redirect to Not Found for unrecognized routes */}
        {/* <Route path="*" element={<Navigate to={PATHS.NOT_FOUND.path} />} /> */}
      </Routes>
    </BrowserRouter>
  );
});
