import { Schema, model, Types } from "mongoose";

export interface Task {
  id: Types.ObjectId; // Use Types.ObjectId for MongoDB IDs
  name: string;
  projectId: Types.ObjectId; // Update this to match the type used in the schema
  columnId: string;
  description: string;
  status: string;
  progress: number;
  startDate: Date; // Use Date type here
  endDate: Date; // Use Date type here
  position: number;
}

const taskSchema = new Schema<Task>({
  name: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  columnId: { type: String },
  description: { type: String },
  status: { type: String, required: true },
  progress: { type: Number, required: true },
  startDate: { type: Date, required: true }, // Corrected the type
  endDate: { type: Date, required: true }, // Corrected the type
  position: { type: Number, required: true },
});

export const TaskModel = model<Task>("Task", taskSchema);
