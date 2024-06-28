// ProjectDetails.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();

  return (
    <div>
      <h2>Project Details</h2>
      <p>Project Name: {projectName}</p>
      {/* Hier können weitere Details zum Projekt angezeigt werden */}
    </div>
  );
};

export default ProjectDetails;
