export class CreateCourseDto {
  image_url: string;
  video_url: string;
  description: string;
  students: [];
  questions: [
    {
      questionId: number;
      question: string;
      options: [];
      answer: string;
    },
  ];
}
