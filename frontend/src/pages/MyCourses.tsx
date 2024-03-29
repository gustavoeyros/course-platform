import HomeHeader from "../components/HomeHeader";
import CourseCard from "../components/CourseCard";
import { CoursesContainer } from "../components/HomeCourses/styled";
import { useEffect, useState } from "react";

interface ICourses {
  description: string;
  image_url: string;
  _id: string;
  students: [];
}

const MyCourses = () => {
  const [courses, setCourses] = useState<ICourses[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();

  const user = JSON.parse(localStorage.getItem("user") || "");
  const userId = user.id;
  const userToken = user.token;

  const getMyCourses = () => {
    setIsLoading(true);
    fetch(`http://localhost:3000/users/mycourses/${userId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        const enrolledCourses = data.user.enrolledCourses;
        setCourses(enrolledCourses);
        setIsLoading(false);
      });
  };

  const removeHandler = (id: string) => {
    const filteredCourses = courses.filter((course) => course._id !== id);
    setCourses(filteredCourses);
  };

  useEffect(() => {
    getMyCourses();
  }, []);

  return (
    <>
      <HomeHeader />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <CoursesContainer>
          {courses.map((data) => {
            return (
              <CourseCard
                description={data.description}
                image={data.image_url}
                courseId={data._id}
                students={data.students}
                continueWatching={true}
                removeCard={removeHandler}
              />
            );
          })}
        </CoursesContainer>
      )}
    </>
  );
};

export default MyCourses;
