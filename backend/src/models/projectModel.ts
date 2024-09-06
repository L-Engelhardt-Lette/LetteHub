import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Project model
interface IProject extends Document {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

// Export the model
export const Project = mongoose.model<IProject>("Project", ProjectSchema);
