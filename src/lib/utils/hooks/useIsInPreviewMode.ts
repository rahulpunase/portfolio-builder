import { APP_PATHS } from "@/lib/constants";
import { useLocation } from "react-router-dom";

const useIsInPreviewMode = () => {
  const location = useLocation();
  return location.pathname === APP_PATHS.Preview;
};

export default useIsInPreviewMode;
