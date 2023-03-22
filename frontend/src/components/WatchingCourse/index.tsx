import { Container, PlayerStyled, VideoPlayer } from "./styled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  const user = JSON.parse(localStorage.getItem("user") || "");
  const token = user.token;
  const userId = user.id;

  let courseId: string;

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
        courseId = data.course._id;
        console.log(courseId);
      });
  };

  const finishedVideoHandler = () => {
    fetch(
      `http://localhost:3000/users/mycourses/finishCourse/${userId}/${courseId}`,
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
      )}
    </Container>
  );
};

export default WatchingCourse;
