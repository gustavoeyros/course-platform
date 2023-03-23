import {
  Container,
  PlayerStyled,
  VideoPlayer,
  PlayerContainer,
} from "./styled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseExam from "../CourseExam";

interface ICourses {
  description: string;
  video_url: string;
  image_url: string;
  _id: string;
  students: [];
}

const WatchingCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<ICourses>();
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [finishCourse, setFinishCourse] = useState<boolean | null>(null);

  const user = JSON.parse(localStorage.getItem("user") || "");
  const token = user.token;
  const userId = user.id;

  const getCourseById = () => {
    setIsLoading(true);
    fetch(`http://localhost:3000/course/${id}`, {
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
        setCourse(data.course);
        setIsLoading(false);
        getCompletedCourses();
      });
  };

  const getCompletedCourses = () => {
    fetch(`http://localhost:3000/users/finishedcourses/${userId}`, {
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
        const finishedCourses: [] = data.finishedCourses;
        const finished = finishedCourses.findIndex((course: any) => {
          return course._id === id;
        });
        if (finished >= 0) {
          setFinishCourse(true);
        } else {
          setFinishCourse(false);
        }
      });
  };

  const finishedVideoHandler = () => {
    setFinishCourse(true);
    fetch(
      `http://localhost:3000/users/mycourses/finishCourse/${userId}/${course?._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    getCourseById();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <PlayerContainer>
          <PlayerStyled>
            <h1>
              Nome do curso: <span>{course?.description}</span>
            </h1>
            <VideoPlayer
              src={course?.video_url}
              controls
              onEnded={finishedVideoHandler}
            />
          </PlayerStyled>
          {finishCourse ? <CourseExam /> : ""}
        </PlayerContainer>
      )}
    </Container>
  );
};

export default WatchingCourse;
