import { Header, HeaderOptions } from "./styled";
import { useNavigate } from "react-router-dom";
const HomeHeader = () => {
  const navigate = useNavigate();
  return (
    <Header>
      <HeaderOptions onClick={() => navigate("/home")}>
        All Courses
      </HeaderOptions>
      <HeaderOptions onClick={() => navigate("/addcourse")}>
        Add Course
      </HeaderOptions>
    </Header>
  );
};

export default HomeHeader;
