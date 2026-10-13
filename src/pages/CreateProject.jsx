import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateProject({ setProjects }) {
  const navigate = useNavigate();

  const [project, setProject] = useState({
    title: "",
    description: "",
    category: "",
    teamSize: "",
    skills: "",
  });

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const savedUser = localStorage.getItem("currentUser");

    if (!savedUser) {
      alert("Please login before creating a project.");
      navigate("/login");
      return;
    }

    let currentUser;

    try {
      currentUser = JSON.parse(savedUser);
    } catch {
      alert("Your login session is invalid. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "https://campus-project-hub-backend.onrender.com/api/projects",
        {
          ...project,
          teamSize: Number(project.teamSize),
          ownerId: currentUser.id,
          ownerName: currentUser.name,
        }
      );

      setProjects((previousProjects) => [
        ...previousProjects,
        response.data,
      ]);

      alert("Project created successfully!");
      navigate("/projects");
    } catch (error) {
      console.error("Error creating project:", error);

      if (error.code === "ERR_NETWORK") {
        alert("alert("Unable to connect to the server. Please try again later.");");
      } else if (error.response?.status === 400) {
        alert("Invalid project details. Please check the form.");
      } else {
        alert("Failed to create project. Please check the backend logs.");
      }
    }
  };

  return (
    <div>
      <h1>Create New Project</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={project.title}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <textarea
          name="description"
          placeholder="Project Description"
          value={project.description}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="text"
          name="category"
          placeholder="Project Category"
          value={project.category}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="number"
          name="teamSize"
          placeholder="Team Size"
          min="1"
          value={project.teamSize}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="text"
          name="skills"
          placeholder="Required Skills"
          value={project.skills}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default CreateProject;