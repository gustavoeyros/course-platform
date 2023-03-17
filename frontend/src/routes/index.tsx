import { Route, Routes } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import AddCourse from "../pages/AddCourse";
import { Navigate } from "react-router-dom";

const RoutesManager = () => {
  const token = localStorage.getItem("token");
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/home"
        element={token ? <Home /> : <Navigate to="/signup" />}
      />
      <Route
        path="/addcourse"
        element={token ? <AddCourse /> : <Navigate to="/signup" />}
      />
    </Routes>
  );
};

export default RoutesManager;
