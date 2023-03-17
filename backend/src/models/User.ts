import { Schema, model } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  enrolledCourses: [];
}

const userSchema = new Schema<IUser>({
  name: String,
  email: String,
  password: String,
  enrolledCourses: [],
});

const User = model<IUser>("User", userSchema);

export default User;
