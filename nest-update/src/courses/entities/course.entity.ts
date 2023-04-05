import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop()
  image_url: string;

  @Prop()
  video_url: string;

  @Prop()
  description: string;

  @Prop()
  students: [];

  @Prop()
  questions: [
    {
      questionId: number;
      question: string;
      options: [];
      answer: string;
    },
  ];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
