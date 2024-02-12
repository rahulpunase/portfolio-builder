import { APP_PATHS } from "@/lib/constants";
import Main from "@/lib/ui/layout/Main";
import BuilderPage from "@/pages/Builder";
import PreviewPage from "@/pages/Preview";
import { Route, Routes, Navigate } from "react-router-dom";

const RouterConfiguration = () => {
  return (
    <Routes>
      <Route element={<Main />} path="/">
        <Route path="" element={<Navigate to={APP_PATHS.Builder} />} />
        <Route element={<BuilderPage />} path={APP_PATHS.Builder} />
        <Route element={<PreviewPage />} path={APP_PATHS.Preview} />
      </Route>
    </Routes>
  );
};

export default RouterConfiguration;
