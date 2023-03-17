import { Card, ImageCourse, EnrollButton } from "./styled";
interface ICourseCard {
  description: string;
  image: string;
  courseId: string;
}

const CourseCard = ({ description, image, courseId }: ICourseCard) => {
  const enrollHandler = () => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const userId = user.id;
    const userToken = user.token;

    if (userId) {
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
        .then((data) => console.log(data));
    }
  };
  return (
    <Card>
      <div>
        <ImageCourse src={image} />
      </div>
      <h1>{description}</h1>
      <EnrollButton onClick={enrollHandler}>Enroll</EnrollButton>
    </Card>
  );
};

export default CourseCard;
