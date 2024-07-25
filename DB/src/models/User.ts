import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }, // In a real application, make sure to hash passwords
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
