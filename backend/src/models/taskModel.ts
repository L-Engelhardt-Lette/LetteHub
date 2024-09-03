import { Schema, model } from "mongoose";

export interface Task {
  id: string;
  name: string;
  projectId: string;
  columnId: string;
  description: string;
  status: string;
  progress: number;
  startDate: string;
  endDate: string;
  position: number;
}

const taskSchema = new Schema<Task>({
  name: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  columnId: { type: String },
  description: { type: String },
  status: { type: String, required: true },
  progress: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  position: { type: Number, required: true },
});

export const TaskModel = model<Task>("Task", taskSchema);
