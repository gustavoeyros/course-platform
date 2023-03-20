import { Route, Routes } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import AddCourse from "../pages/AddCourse";
import MyCourses from "../pages/MyCourses";
import { Navigate } from "react-router-dom";
import CoursePlayer from "../pages/CoursePlayer";

const RoutesManager = () => {
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : false;
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
      <Route
        path="/mycourses"
        element={token ? <MyCourses /> : <Navigate to="/signup" />}
      />

      <Route
        path="/mycourses/:id"
        element={token ? <CoursePlayer /> : <Navigate to="/signup" />}
      />
    </Routes>
  );
};

export default RoutesManager;
