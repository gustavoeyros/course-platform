import { Schema, model } from "mongoose";

interface IUser {
  name: String;
  email: String;
  password: String;
}

const userSchema = new Schema<IUser>({
  name: String,
  email: String,
  password: String,
});

const User = model<IUser>("User", userSchema);

export default User;
