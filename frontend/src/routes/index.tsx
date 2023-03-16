import { Route, Routes } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import AddCourse from "../pages/AddCourse";

const RoutesManager = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/addcourse" element={<AddCourse />} />
    </Routes>
  );
};

export default RoutesManager;
