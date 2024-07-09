import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../scss/pages/ProjectDetail.scss";
import { CustomKanban } from "../components/Project/ProjectViewTableBeta";
import SearchComponent from "../components/Project/Deatils/UserSearchBar";
import { GoX } from "react-icons/go";
import { CiCircleCheck } from "react-icons/ci";
import { GoXCircle } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";
// Beispiel-Mock-Daten. Ersetze diese mit deinen eigenen Daten oder API-Aufrufen.
const projects = [
  {
    id: "1",
    name: "Project Alpha",
    description: "This is the description for Project Alpha.",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    participants: ["Alice Müller", "Bob Schmidt", "Charlie Brown"],
  },
  {
    id: "2",
    name: "Project Beta",
    description: "This is the description for Project Beta.",
    startDate: "2024-02-01",
    endDate: "2024-11-30",
    participants: ["David Lange", "Eva Köhler", "Frank Meier", "Klaus Rührei"],
  },
  // Weitere Projekte hier hinzufügen
];

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [editable, setEditable] = useState(false);
  const [editedProject, setEditedProject] = useState(
    projects.find((p) => p.id === projectId)
  );
  const [tempName, setTempName] = useState(editedProject?.name || "");
  const [tempStartDate, setTempStartDate] = useState(
    editedProject?.startDate || ""
  );
  const [tempEndDate, setTempEndDate] = useState(editedProject?.endDate || "");
  const [tempParticipants, setTempParticipants] = useState<string[]>(
    editedProject?.participants || []
  );
  const [tempDescription, setTempDescription] = useState(
    editedProject?.description || ""
  );
  const [selectedParticipants, setSelectedParticipants] =
    useState<string[]>(tempParticipants); // Initially set to tempParticipants

  const toggleEditMode = () => {
    setEditable(!editable);
    setTempName(editedProject?.name || "");
    setTempStartDate(editedProject?.startDate || "");
    setTempEndDate(editedProject?.endDate || "");
    setTempParticipants(editedProject?.participants || []);
    setTempDescription(editedProject?.description || "");

    // Set selectedParticipants to tempParticipants when entering edit mode
    setSelectedParticipants([...tempParticipants]);
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
    console.log("Updated Project:", updatedProject);
    setEditedProject(updatedProject);
    setEditable(false);
  };

  const handleCancel = () => {
    setEditable(false);
    setTempName(editedProject?.name || "");
    setTempStartDate(editedProject?.startDate || "");
    setTempEndDate(editedProject?.endDate || "");
    setTempParticipants(editedProject?.participants || []);
    setTempDescription(editedProject?.description || "");
  };

  const handleParticipantSelect = (selected: string[]) => {
    const updatedParticipants = [
      ...tempParticipants,
      ...selected.filter((item) => !tempParticipants.includes(item)),
    ];
    setSelectedParticipants(updatedParticipants);
    setTempParticipants(updatedParticipants);
  };

  const handleRemoveParticipant = (participant: string) => {
    const updatedParticipants = tempParticipants.filter(
      (p) => p !== participant
    );
    setSelectedParticipants(updatedParticipants);
    setTempParticipants(updatedParticipants);
  };

  if (!editedProject) {
    return <p>Project not found</p>;
  }

  return (
    <>
      <div className="project-detail">
        <div className="project-card">
          <h2 id="project-detail-title">
            {editable ? (
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
              />
            ) : (
              editedProject.name
            )}
          </h2>
          <hr />

          <div className="card-section">
            {editable ? (
              <>
                <strong>Start:</strong>
                <input
                  type="date"
                  value={tempStartDate}
                  onChange={(e) => setTempStartDate(e.target.value)}
                />
                &nbsp;|&nbsp;
                <strong>Ende:</strong>{" "}
                <input
                  type="date"
                  value={tempEndDate}
                  onChange={(e) => setTempEndDate(e.target.value)}
                />
              </>
            ) : (
              <>
                <strong>Start:</strong> {editedProject.startDate} &nbsp;|&nbsp;{" "}
                <strong>Ende:</strong> {editedProject.endDate}
              </>
            )}
          </div>
          <hr />

          <div className="card-section">
            <strong>Teilnehmer:</strong>{" "}
            {editable ? (
              <>
                <div className="selected-participants">
                  {selectedParticipants.map((participant, index) => (
                    <div key={index} className="selected-participant">
                      {participant}
                      <GoX
                        className="remove-participant"
                        onClick={() => handleRemoveParticipant(participant)}
                      />
                    </div>
                  ))}
                </div>
                <SearchComponent
                  participants={projects.flatMap(
                    (project) => project.participants
                  )}
                  onSelect={handleParticipantSelect}
                />
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
          <hr />

          <div className="card-section">
            <div className="progress-section">
              <strong>Progress:</strong> {/* Hier Platz für den Fortschritt */}
              <div className="progress-loader">
                <div className="progress"></div>
              </div>
            </div>
          </div>
          <hr />
          <div className="card-section">
            <strong>Beschreibung:</strong>{" "}
            {editable ? (
              <textarea
                className="description-input"
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
              />
            ) : (
              editedProject.description
            )}
          </div>
          {editable ? (
            <div className="edit-buttons">
              <div id="Buttons">
                <button className="save-button" id="lol" onClick={handleSave}>
                  <CiCircleCheck />
                  Speichern
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                  <GoXCircle />
                  Abbrechen
                </button>
              </div>
            </div>
          ) : (
            <button className="edit-button" onClick={toggleEditMode}>
              <BiEditAlt />
              Bearbeiten
            </button>
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
