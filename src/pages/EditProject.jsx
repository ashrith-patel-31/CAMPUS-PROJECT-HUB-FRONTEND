import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProject({ projects, setProjects }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const projectId = Number(id);

  const existingProject = projects.find(
    (item) => item.id === projectId
  );

  const [project, setProject] = useState(existingProject || null);

  useEffect(() => {
    if (existingProject) {
      setProject(existingProject);
    }
  }, [existingProject]);

  if (!project) {
    return <h2>Project not found</h2>;
  }

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://campus-project-hub-backend.onrender.com/api/projects/${id}`,
        {
          title: project.title,
          description: project.description,
          category: project.category,
          teamSize: Number(project.teamSize),
          skills: project.skills,
        }
      );

      setProjects((previousProjects) =>
        previousProjects.map((item) =>
          item.id === projectId ? response.data : item
        )
      );

      alert("Project updated successfully!");
      navigate("/projects");
    } catch (error) {
      console.error("Error updating project:", error);

      if (error.code === "ERR_NETWORK") {
        alert(
          "alert("Unable to connect to the server. Please try again later.");"
        );
      } else if (error.response?.status === 404) {
        alert("Project not found on the server.");
      } else {
        alert("Failed to update project. Check the backend logs.");
      }
    }
  };

  return (
    <div>
      <h1>Edit Project</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={project.title || ""}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <textarea
          name="description"
          placeholder="Project Description"
          value={project.description || ""}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="text"
          name="category"
          placeholder="Project Category"
          value={project.category || ""}
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
          value={project.teamSize ?? ""}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="text"
          name="skills"
          placeholder="Required Skills"
          value={project.skills || ""}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <button type="submit">Update Project</button>
      </form>
    </div>
  );
}

export default EditProject;