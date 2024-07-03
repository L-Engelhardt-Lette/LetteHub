const baseUrl = "http://localhost:5000/api";

interface Project {
  title: string;
  startdate: string;
  enddate: string;
  personworkinon: string[];
  description: string;
}

export const createProject = async (project: Project) => {
  const response = await fetch(`${baseUrl}/projects/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });

  if (!response.ok) {
    throw new Error("Project creation failed");
  }

  return await response.json();
};

export const getProjects = async () => {
  const response = await fetch(`${baseUrl}/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to retrieve projects");
  }

  return await response.json();
};
