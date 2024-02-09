import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main className="h-full bg-background">
      <div className="w-full">
        <Outlet />
      </div>
    </main>
  );
};

export default Main;
