import { Schema, model } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  enrolledCourses: [];
  finishedCourses: [];
}

const userSchema = new Schema<IUser>({
  name: String,
  email: String,
  password: String,
  enrolledCourses: [],
  finishedCourses: [],
});

const User = model<IUser>("User", userSchema);

export default User;
