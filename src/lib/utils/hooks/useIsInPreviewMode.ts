import { useLocation } from "react-router-dom";

const useIsInPreviewMode = () => {
  const location = useLocation();
  return location.pathname === "/preview";
};

export default useIsInPreviewMode;
