const baseUrl = "http://localhost:5000/api";

interface Task {
  task_name: string;
  project_id: number;
  description: string;
  persons: string[];
  status: number;
  progress: number;
  startDate: string;
  finishDate: string;
}

export const createTask = async (task: Task) => {
  const response = await fetch(`${baseUrl}/tasks/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Task creation failed");
  }

  return await response.json();
};

export const getTasks = async (project_id: number) => {
  const response = await fetch(`${baseUrl}/tasks/${project_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to retrieve tasks");
  }

  return await response.json();
};
