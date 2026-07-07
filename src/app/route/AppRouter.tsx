import { Routes } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import ClientRoutes from "./ClientRoutes";

function AppRouter() {
  return (
    <Routes>
      {ClientRoutes}
      {AdminRoutes}
    </Routes>
  );
}

export default AppRouter;
