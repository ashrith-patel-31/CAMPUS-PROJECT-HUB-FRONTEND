import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ProjectDetails({ projects }) {
  const { id } = useParams();

  const project = projects.find(
    (project) => project.id === Number(id)
  );

  const [requestSent, setRequestSent] = useState(false);

  if (!project) {
    return <h2>Project not found</h2>;
  }

  const savedUser = localStorage.getItem("currentUser");

  const currentUser = savedUser
    ? JSON.parse(savedUser)
    : null;

  // Calculate skill match
  const requiredSkills = project.skills
    ? project.skills
        .split(",")
        .map((skill) => skill.trim().toLowerCase())
        .filter((skill) => skill !== "")
    : [];

  const studentSkills = currentUser?.skills
    ? currentUser.skills
        .split(",")
        .map((skill) => skill.trim().toLowerCase())
        .filter((skill) => skill !== "")
    : [];

  const commonSkills = requiredSkills.filter((skill) =>
    studentSkills.includes(skill)
  );

  const skillMatch =
    requiredSkills.length > 0
      ? Math.round(
          (commonSkills.length / requiredSkills.length) * 100
        )
      : 0;

  const handleJoinRequest = async () => {
    if (!currentUser) {
      alert("Please login before requesting to join a project.");
      return;
    }

    if (currentUser.id === project.ownerId) {
      alert("You cannot request to join your own project.");
      return;
    }

    try {
      const newRequest = {
        studentName: currentUser.name,
        skills: currentUser.skills || "No skills added",
        projectId: project.id,
        projectTitle: project.title,
        ownerId: project.ownerId,
        ownerName: project.ownerName,
        status: "Pending",
      };

      await axios.post(
        "https://campus-project-hub-backend.onrender.com/api/join-requests",
        newRequest
      );

      setRequestSent(true);

      alert("Join request sent successfully!");
    } catch (error) {
      console.error("Error sending join request:", error);

      if (
        error.response &&
        error.response.status === 400
      ) {
        alert(
          "You have already requested to join this project."
        );
      } else {
        alert("Failed to send join request.");
      }
    }
  };

  return (
    <div>
      <h1>{project.title}</h1>

      <p>
        <strong>Project Owner:</strong>{" "}
        {project.ownerName || "Not available"}
      </p>

      <p>
        <strong>Description:</strong>
      </p>

      <p>{project.description}</p>

      <p>
        <strong>Category:</strong>{" "}
        {project.category}
      </p>

      <p>
        <strong>Team Size:</strong>{" "}
        {project.teamSize}
      </p>

      <p>
        <strong>Required Skills:</strong>{" "}
        {project.skills}
      </p>

      <hr />

      <h3>Skill Match</h3>

      {!currentUser ? (
        <p>Please login to see your skill match.</p>
      ) : (
        <>
          <p>
            <strong>Your Skills:</strong>{" "}
            {currentUser.skills || "No skills added"}
          </p>

          <p>
            <strong>Matching Skills:</strong>{" "}
            {commonSkills.length > 0
              ? commonSkills.join(", ")
              : "None"}
          </p>

          <p>
            <strong>Skill Match:</strong>{" "}
            {skillMatch}%
          </p>
        </>
      )}

      <hr />

      {!requestSent ? (
        <button onClick={handleJoinRequest}>
          Request to Join
        </button>
      ) : (
        <p>
          <strong>Request Status:</strong> Pending
        </p>
      )}

      <br />
      <br />

      <Link to="/projects">
        <button>Back to Projects</button>
      </Link>
    </div>
  );
}

export default ProjectDetails;