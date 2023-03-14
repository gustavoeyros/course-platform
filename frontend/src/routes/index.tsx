import { Route, Routes } from "react-router-dom";
import Welcome from "../pages/Welcome";

const RoutesManager = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
    </Routes>
  );
};

export default RoutesManager;
