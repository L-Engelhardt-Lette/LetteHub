import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found");
      navigate("/login"); // Redirect to login if no token is found
      return;
    }

    if (projectId) {
      const fetchProject = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/projects/${projectId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`, // Use the stored access token
              },
            }
          );
          setEditedProject(response.data);
          setTempName(response.data.name);
          setTempStartDate(response.data.startDate);
          setTempEndDate(response.data.endDate);
          setTempParticipants(response.data.participants || []); // Ensure it's an array
          setTempDescription(response.data.description);
          setSelectedParticipants(response.data.participants || []); // Ensure it's an array
          setTasks(response.data.tasks || []); // Load tasks if they exist
        } catch (error) {
          console.error("Error fetching project:", error);
          navigate("/projects");
        }
      };

      fetchProject();
    } else {
      navigate("/projects");
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
      tasks: tasks, // Ensure tasks are included in the update
    };

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found");
      navigate("/login");
      return;
    }

    try {
      await axios.put(
        `http://localhost:3001/api/projects/${projectId}`,
        updatedProject,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Use the stored access token
          },
        }
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
      <div className="relative p-6">
        <Link to="/projects">
          <button className="absolute top-20 left-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            Back
          </button>
        </Link>
        <div className="bg-white rounded-lg shadow-lg p-5 mt-24">
          <h2 id="project-detail-title" className="text-2xl font-bold mb-4">
            {editable ? (
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full border rounded p-2"
              />
            ) : (
              editedProject.name
            )}
          </h2>
          <hr className="mb-4" />

          <div className="mb-4">
            {editable ? (
              <>
                <strong className="block">Start:</strong>
                <input
                  type="date"
                  value={tempStartDate}
                  onChange={(e) => setTempStartDate(e.target.value)}
                  className="border rounded p-2"
                />
                <span className="mx-2">|</span>
                <strong className="block">End:</strong>{" "}
                <input
                  type="date"
                  value={tempEndDate}
                  onChange={(e) => setTempEndDate(e.target.value)}
                  className="border rounded p-2"
                />
              </>
            ) : (
              <>
                <strong className="block">Start:</strong>{" "}
                {editedProject.startDate} <span className="mx-2">|</span>{" "}
                <strong className="block">End:</strong> {editedProject.endDate}
              </>
            )}
          </div>
          <hr className="mb-4" />

          <div className="mb-4">
            <strong className="block">Participants:</strong>{" "}
            {editable ? (
              <>
                <div className="flex flex-wrap">
                  {selectedParticipants.map((participant, index) => (
                    <div
                      key={index}
                      className="bg-blue-100 rounded p-2 m-1 flex items-center"
                    >
                      {participant}
                      <GoX
                        className="ml-2 cursor-pointer"
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
              <div className="flex flex-wrap">
                {Array.isArray(editedProject.participants) ? (
                  editedProject.participants.map((participant, index) => (
                    <div
                      key={index}
                      className="bg-blue-100 rounded p-2 m-1 flex items-center"
                    >
                      {participant}
                    </div>
                  ))
                ) : (
                  <p>No participants found</p>
                )}
              </div>
            )}
          </div>
          <hr className="mb-4" />

          <div className="mb-4">
            <strong className="block">Description:</strong>
            {editable ? (
              <textarea
                className="w-full h-24 border rounded p-2"
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
              />
            ) : (
              <p>{editedProject.description}</p>
            )}
          </div>
          {editable ? (
            <div className="flex justify-end space-x-4">
              <button
                className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={handleSave}
              >
                <CiCircleCheck className="mr-2" />
                Save
              </button>
              <button
                className="flex items-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                onClick={handleCancel}
              >
                <GoXCircle className="mr-2" />
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={toggleEditMode}
            >
              <BiEditAlt className="mr-2" />
              Edit
            </button>
          )}
        </div>
      </div>
      <CustomKanban projectId={projectId || ""} />
    </>
  );
};

export default ProjectDetail;
