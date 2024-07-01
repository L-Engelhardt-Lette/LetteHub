// src/pages/ProjectDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import '../scss/pages/ProjectDetail.scss';

// Mock data as an example. Replace this with your actual data source or API call.
const projects = [
  {
    id: '1',
    name: 'Project Alpha',
    description: 'This is the description for Project Alpha.',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    participants: ['Alice', 'Bob', 'Charlie'],
  },
  {
    id: '2',
    name: 'Project Beta',
    description: 'This is the description for Project Beta.',
    startDate: '2024-02-01',
    endDate: '2024-11-30',
    participants: ['Dave', 'Eve', 'Frank'],
  },
  // Weitere Projekte hier hinzufügen
];

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return <p>Project not found</p>;
  }

  return (
    <div className="project-detail">
      <h1>Project Details</h1>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <p><strong>Start Date:</strong> {project.startDate}</p>
      <p><strong>End Date:</strong> {project.endDate}</p>
      <h3>Participants:</h3>
      <ul>
        {project.participants.map(participant => (
          <li key={participant}>{participant}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetail;
