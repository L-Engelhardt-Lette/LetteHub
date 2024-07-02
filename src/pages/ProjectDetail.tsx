import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../scss/pages/ProjectDetail.scss'; // Stil-Datei für die Seite
import { CustomKanban } from '../components/Project/ProjectViewTable'; // Beispielhaft importierte Komponente
import ProjectDetailAccordion from '../components/ProjectDetailAccordion'; // Beispielhaft importierte Komponente
import '../scss/pages/ProjectDetail.scss'; // Stil-Datei für die Seite

// Beispiel-Mock-Daten. Ersetze diese mit deinen eigenen Daten oder API-Aufrufen.
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
  const [editable, setEditable] = useState(false);
  const [editedProject, setEditedProject] = useState(projects.find(p => p.id === projectId));
  const [tempName, setTempName] = useState(editedProject?.name || '');
  const [tempStartDate, setTempStartDate] = useState(editedProject?.startDate || '');
  const [tempEndDate, setTempEndDate] = useState(editedProject?.endDate || '');
  const [tempParticipants, setTempParticipants] = useState<string[]>(editedProject?.participants || []);
  const [tempDescription, setTempDescription] = useState(editedProject?.description || '');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

  const toggleEditMode = () => {
    setEditable(!editable);
    setTempName(editedProject?.name || '');
    setTempStartDate(editedProject?.startDate || '');
    setTempEndDate(editedProject?.endDate || '');
    setTempParticipants(editedProject?.participants || []);
    setTempDescription(editedProject?.description || '');
  };

  const handleSave = () => {
    const updatedProject = {
      ...editedProject,
      name: tempName,
      startDate: tempStartDate,
      endDate: tempEndDate,
      participants: tempParticipants,
      description: tempDescription,
    };
    // Hier könntest du die Logik zum Speichern der Änderungen implementieren, z.B. eine API-Aufruf
    console.log('Updated Project:', updatedProject);
    setEditedProject(updatedProject);
    setEditable(false);
  };

  const handleCancel = () => {
    setEditable(false);
    // Zurücksetzen auf die ursprünglichen Daten, falls der Benutzer Änderungen verwirft
    setTempName(editedProject?.name || '');
    setTempStartDate(editedProject?.startDate || '');
    setTempEndDate(editedProject?.endDate || '');
    setTempParticipants(editedProject?.participants || []);
    setTempDescription(editedProject?.description || '');
  };

  const handleParticipantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setTempParticipants(selectedOptions);
  };

  const handleParticipantSelect = (participant: string) => {
    setSelectedParticipants([...selectedParticipants, participant]);
  };

  const handleParticipantRemove = (participant: string) => {
    setSelectedParticipants(selectedParticipants.filter(p => p !== participant));
  };

  if (!editedProject) {
    return <p>Project not found</p>;
  }

  return (
    <>
      <div className="project-detail">
        <div className="project-card">
          <h2>{editable ? (
            <input type="text" value={tempName} onChange={e => setTempName(e.target.value)} />
          ) : (
            editedProject.name
          )}</h2>
          <div className="card-section">
            {editable ? (
              <>
                <strong>Start:</strong> 
                <input type="date" value={tempStartDate} onChange={e => setTempStartDate(e.target.value)} />
                &nbsp;|&nbsp; 
                <strong>Ende:</strong>{' '}
                <input type="date" value={tempEndDate} onChange={e => setTempEndDate(e.target.value)} />
              </>
            ) : (
              <>
                <strong>Start:</strong> {editedProject.startDate} &nbsp;|&nbsp; <strong>Ende:</strong> {editedProject.endDate}
              </>
            )}
          </div>
          <div className="card-section">
            <strong>Teilnehmer:</strong> {editable ? (
              <>
                <select multiple value={tempParticipants} onChange={handleParticipantChange}>
                  {projects.flatMap(project => project.participants).map((participant, index) => (
                    <option key={index} value={participant}>{participant}</option>
                  ))}
                </select>
                <div className="selected-participants">
                  {selectedParticipants.map((participant, index) => (
                    <div key={index} className="selected-participant">
                      {participant}
                      <span className="remove-participant" onClick={() => handleParticipantRemove(participant)}>x</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="selected-participants">
                {editedProject.participants.map((participant, index) => (
                  <div key={index} className="selected-participant">
                    {participant}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="card-section">
            <strong>Progress:</strong> {/* Hier Platz für den Fortschritt */}
          </div>
          <hr />
          <div className="card-section">
            <strong>Beschreibung:</strong> {editable ? (
              <textarea
                value={tempDescription}
                onChange={e => setTempDescription(e.target.value)}
              />
            ) : (
              editedProject.description
            )}
          </div>
          {editable ? (
            <div className="edit-buttons">
              <button className="save-button" onClick={handleSave}>Speichern</button>
              <button className="cancel-button" onClick={handleCancel}>Abbrechen</button>
            </div>
          ) : (
            <button className="edit-button" onClick={toggleEditMode}>Bearbeiten</button>
          )}
        </div>
        {/* Hier könnte die ProjectDetailAccordion-Komponente eingefügt werden */}
        {/* <ProjectDetailAccordion /> */}
      </div>
      <CustomKanban />
    </>
  );
};

export default ProjectDetail;