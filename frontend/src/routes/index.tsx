import { Route, Routes } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Signup from "../pages/Signup";

const RoutesManager = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default RoutesManager;
