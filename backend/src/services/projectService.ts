import { Project } from "../models/projectModel";

// Service to create a new project
export const createProjectService = async ({
  name,
  description,
  startDate,
  endDate,
}: Partial<(typeof Project)["prototype"]>) => {
  const project = new Project({ name, description, startDate, endDate });
  await project.save();
  return project;
};

// Service to fetch all projects
export const getAllProjectsService = async () => {
  return await Project.find(); // Returns all projects
};

// Service to delete a project by ID
export const deleteProjectService = async (projectId: string) => {
  return await Project.findByIdAndDelete(projectId);
};
