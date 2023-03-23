import { Schema, model } from "mongoose";

interface ICourse {
  image_url: string;
  video_url: string;
  description: string;
  students: [];
  questions: [];
}

const courseSchema = new Schema<ICourse>({
  image_url: String,
  video_url: String,
  description: String,
  students: [],
  questions: [
    {
      questionId: Number,
      question: String,
      options: [],
      answer: String,
    },
  ],
});

const Course = model<ICourse>("Course", courseSchema);

export default Course;
