import Main from "@/lib/ui/layout/Main";
import BuilderPage from "@/pages/Builder";
import { Route, Routes } from "react-router-dom";

const RouterConfiguration = () => {
  return (
    <Routes>
      <Route element={<Main />} path="/">
        <Route element={<BuilderPage />} path="builder" />
      </Route>
    </Routes>
  );
};

export default RouterConfiguration;
