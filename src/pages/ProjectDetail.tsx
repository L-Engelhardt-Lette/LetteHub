import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../scss/pages/ProjectDetail.scss";
import { CustomKanban } from "../components/Project/ProjectViewTable";
import SearchComponent from "../components/Project/Deatils/UserSearchBar";
import { GoX } from "react-icons/go";
import { CiCircleCheck } from "react-icons/ci";
import { GoXCircle } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [editable, setEditable] = useState(false);
  const [editedProject, setEditedProject] = useState<any>(null);
  const [tempName, setTempName] = useState("");
  const [tempStartDate, setTempStartDate] = useState("");
  const [tempEndDate, setTempEndDate] = useState("");
  const [tempParticipants, setTempParticipants] = useState<string[]>([]);
  const [tempDescription, setTempDescription] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    []
  );

  useEffect(() => {
    if (projectId) {
      const fetchProject = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/projects/${projectId}`,
            { withCredentials: true }
          );
          setEditedProject(response.data);
          setTempName(response.data.name);
          setTempStartDate(response.data.startDate);
          setTempEndDate(response.data.endDate);
          setTempParticipants(response.data.participants);
          setTempDescription(response.data.description);
          setSelectedParticipants(response.data.participants);
        } catch (error) {
          console.error("Error fetching project:", error);
          navigate("/projectSelect");
        }
      };

      fetchProject();
    } else {
      navigate("/projectSelect");
    }
  }, [projectId, navigate]);

  const toggleEditMode = () => {
    setEditable(!editable);
    setTempName(editedProject?.name || "");
    setTempStartDate(editedProject?.startDate || "");
    setTempEndDate(editedProject?.endDate || "");
    setTempParticipants(editedProject?.participants || []);
    setTempDescription(editedProject?.description || "");
    setSelectedParticipants([...tempParticipants]);
  };

  const handleSave = async () => {
    const updatedProject = {
      name: tempName,
      startDate: tempStartDate,
      endDate: tempEndDate,
      participants: tempParticipants,
      description: tempDescription,
    };
    try {
      await axios.put(
        `http://localhost:5000/api/projects/${projectId}`,
        updatedProject,
        { withCredentials: true }
      );
      setEditedProject(updatedProject);
      setEditable(false);
    } catch (error) {
      console.error("Error updating project:", error);
    }
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
        <Link to="/projectSelect">
          <button className="back-button">Zurück</button>
        </Link>
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
                  participants={selectedParticipants}
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
            <strong>Beschreibung:</strong>
            {editable ? (
              <textarea
                className="description-input"
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
              />
            ) : (
              <div>{editedProject.description}</div>
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
      <CustomKanban projectId={projectId || ""} />
    </>
  );
};

export default ProjectDetail;
