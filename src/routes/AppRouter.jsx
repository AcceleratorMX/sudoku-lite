import { Routes, Route, Navigate } from "react-router-dom";
import { Start, Game, Scores } from "../pages";
import { ROUTE_PATHS } from "../constants";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTE_PATHS.START} element={<Start />} />

      <Route path={ROUTE_PATHS.GAME} element={<Game />} />

      <Route path={ROUTE_PATHS.SCORES} element={<Scores />} />

      <Route path={ROUTE_PATHS.FALLBACK} element={<Navigate to={ROUTE_PATHS.START} replace />} />
    </Routes>
  );
};

export default AppRouter;
