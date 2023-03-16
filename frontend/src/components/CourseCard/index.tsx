import { Card, ImageCourse } from "./styled";
interface ICourseCard {
  description: string;
  image: string;
}

const CourseCard = ({ description, image }: ICourseCard) => {
  return (
    <Card>
      <h1>{description}</h1>
      <p>
        <ImageCourse src={image} />
      </p>
    </Card>
  );
};

export default CourseCard;
