import { Route, Routes } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Signup from "../pages/Signup";
import Home from "../pages/Home";

const RoutesManager = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default RoutesManager;
