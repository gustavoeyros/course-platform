import { CoursesContainer } from "./styled";
import { useEffect, useState } from "react";
import CourseCard from "../CourseCard";

interface ICourses {
  description: string;
  image_url: string;
  _id: string;
  students: [];
}

const HomeCourses = () => {
  const user = JSON.parse(localStorage.getItem("user") || "");
  const token = user.token;
  const userId = user.id;

  const [courses, setCourses] = useState<ICourses[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();

  const getAllCourses = () => {
    setIsLoading(true);
    fetch("http://localhost:3000/course/all", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setCourses(data.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <CoursesContainer>
          {courses.map((data) => (
            <CourseCard
              description={data.description}
              image={data.image_url}
              courseId={data._id}
              students={data.students}
            />
          ))}
        </CoursesContainer>
      )}
    </>
  );
};

export default HomeCourses;
