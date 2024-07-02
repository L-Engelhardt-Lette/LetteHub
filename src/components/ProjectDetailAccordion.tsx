import React, { useState } from 'react';

const ProjectDetailAccordion = ({ project }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  return (
    <div className="accordion" id="projectAccordion">
      <div className="card">
        <div className="card-header" id="headingOne">
          <h2 className="mb-0">
            <button
              className={`btn btn-link ${accordionOpen ? '' : 'collapsed'}`}
              type="button"
              onClick={toggleAccordion}
              aria-expanded={accordionOpen}
              aria-controls="collapseOne"
            >
              Project Details
            </button>
          </h2>
        </div>

        <div
          id="collapseOne"
          className={`collapse ${accordionOpen ? 'show' : ''}`}
          aria-labelledby="headingOne"
          data-parent="#projectAccordion"
        >
          <div className="card-body">
            {/* Accordion-Inhalt */}
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p><strong>Start Date:</strong> {project.startDate}</p>
            <p><strong>End Date:</strong> {project.endDate}</p>

            <div className="participants">
              <h3>Participants:</h3>
              <ul>
                {project.participants.map(participant => (
                  <li key={participant}>{participant}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailAccordion;
