import { useEffect, useState } from "react";
import {
  Card,
  ImageCourse,
  EnrollButton,
  EnrolledButton,
  ContinueWatching,
  Unenroll,
} from "./styled";
interface ICourseCard {
  description: string;
  image: string;
  courseId: string;
  students: [];
  continueWatching?: boolean;
}

const CourseCard = ({
  description,
  image,
  courseId,
  students,
  continueWatching,
}: ICourseCard) => {
  const [enrolled, setEnrolled] = useState<boolean | null>(null);
  const user = JSON.parse(localStorage.getItem("user") || "");
  const userId = user.id;
  const userToken = user.token;
  const enrollHandler = () => {
    fetch(`http://localhost:3000/users/enroll/${userId}/${courseId}`, {
      method: "PATCH",
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
        console.log(data);
        setEnrolled(true);
      });
  };

  const unenrollHandler = () => {
    fetch(`http://localhost:3000/users/unenroll/${userId}/${courseId}`, {
      method: "PATCH",
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
        console.log(data);
      });
  };

  let hasEnrolled = students.findIndex((student) => {
    return student == userId;
  });

  return (
    <Card>
      <div>
        <ImageCourse src={image} />
      </div>
      <h1>{description}</h1>
      {!continueWatching ? (
        enrolled === true || hasEnrolled >= 0 ? (
          <EnrolledButton disabled>Enrolled</EnrolledButton>
        ) : (
          <EnrollButton onClick={enrollHandler}>Enroll</EnrollButton>
        )
      ) : (
        <>
          <ContinueWatching>Continue Watching</ContinueWatching>
          <Unenroll onClick={unenrollHandler}>Unenroll</Unenroll>
        </>
      )}
    </Card>
  );
};

export default CourseCard;
