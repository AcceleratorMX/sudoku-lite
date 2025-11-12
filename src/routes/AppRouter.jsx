import { Routes, Route, Navigate } from "react-router-dom";
import { Start, Game, Scores } from "../pages";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />

      <Route path="/game/:playerId" element={<Game />} />

      <Route path="/scores/:playerId" element={<Scores />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
