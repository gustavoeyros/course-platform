import HomeHeader from "../components/HomeHeader";
import { useEffect, useState } from "react";

interface ICourses {
  description: string;
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

  useEffect(() => {
    getMyCourses();
  }, []);

  return (
    <>
      <HomeHeader />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {courses.map((data) => (
            <p>{data.description}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default MyCourses;