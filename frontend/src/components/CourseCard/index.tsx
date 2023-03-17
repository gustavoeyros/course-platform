import { Card, ImageCourse, EnrollButton } from "./styled";
interface ICourseCard {
  description: string;
  image: string;
}

const CourseCard = ({ description, image }: ICourseCard) => {
  return (
    <Card>
      <div>
        <ImageCourse src={image} />
      </div>
      <h1>{description}</h1>
      <EnrollButton>Enroll</EnrollButton>
    </Card>
  );
};

export default CourseCard;
