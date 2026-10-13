import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Projects.css";

function Projects({ projects, setProjects }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const savedUser = localStorage.getItem("currentUser");
  const currentUser = savedUser ? JSON.parse(savedUser) : null;

  const categories = useMemo(() => {
    const unique = [
      ...new Set(
        (projects || []).map((p) => p.category).filter(Boolean)
      ),
    ];
    return ["All", ...unique];
  }, [projects]);

  const visibleProjects = useMemo(() => {
    const term = search.trim().toLowerCase();

    return (projects || []).filter((project) => {
      const matchesCategory =
        activeCategory === "All" ||
        project.category === activeCategory;

      const searchable = [
        project.title,
        project.description,
        project.category,
        project.skills,
        project.ownerName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchable.includes(term);
    });
  }, [projects, search, activeCategory]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://campus-project-hub-backend.onrender.com/api/projects/${id}`
      );

      setProjects((previousProjects) =>
        previousProjects.filter((project) => project.id !== id)
      );

      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);

      if (error.code === "ERR_NETWORK") {
        alert(
          "alert("Unable to connect to the server. Please try again later.");"
        );
      } else if (error.response?.status === 404) {
        alert("Project not found. It may have already been deleted.");
      } else {
        alert("Failed to delete project. Please try again.");
      }
    }
  };

  return (
    <main className="explore-page">
      <section className="explore-heading">
        <div>
          <span className="explore-eyebrow">
            <span /> YOUR NEXT COLLABORATION STARTS HERE
          </span>

          <h1>
            Discover your next <span>project.</span>
          </h1>

          <p>
            Explore ideas, share your skills, and find people to build with.
          </p>
        </div>

        <Link
          className="explore-create-button"
          to="/create-project"
        >
          <span>＋</span> Create project
        </Link>
      </section>

      <section
        className="explore-tools"
        aria-label="Search and filter projects"
      >
        <label className="explore-search">
          <span>⌕</span>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects, skills, or categories..."
            aria-label="Search projects"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </label>

        <div
          className="explore-filters"
          aria-label="Project categories"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory === category ? "active" : ""
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="explore-results-count">
          {visibleProjects.length}{" "}
          {visibleProjects.length === 1 ? "project" : "projects"} to explore
        </div>
      </section>

      {visibleProjects.length === 0 ? (
        <section className="explore-empty">
          <div>⌕</div>
          <h2>No matching projects</h2>

          <p>
            Try another search, or create a new project for your next idea.
          </p>

          {(search || activeCategory !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              Clear filters
            </button>
          )}
        </section>
      ) : (
        <section className="explore-grid">
          {visibleProjects.map((project, index) => {
            const skills = String(project.skills || "")
              .split(/[,;]+/)
              .map((skill) => skill.trim())
              .filter(Boolean);

            return (
              <article
                className="explore-project-card"
                key={project.id}
              >
                <div
                  className={`explore-card-accent accent-${index % 4}`}
                >
                  <span className="explore-project-symbol">
                    {["✦", "⌘", "◈", "↗"][index % 4]}
                  </span>

                  {project.category && (
                    <span className="explore-category">
                      {project.category}
                    </span>
                  )}
                </div>

                <div className="explore-card-content">
                  <h2>{project.title}</h2>

                  <p className="explore-description">
                    {project.description ||
                      "A student-led project looking for ideas and collaborators."}
                  </p>

                  <div className="explore-skill-list">
                    {skills.length ? (
                      skills.map((skill, i) => (
                        <span key={`${skill}-${i}`}>{skill}</span>
                      ))
                    ) : (
                      <span>Open to skills</span>
                    )}
                  </div>

                  <div className="explore-project-meta">
                    <span>
                      <small>PROJECT OWNER</small>
                      <strong>
                        {project.ownerName || "Student team"}
                      </strong>
                    </span>

                    <span>
                      <small>TEAM SIZE</small>
                      <strong>{project.teamSize || "Flexible"}</strong>
                    </span>
                  </div>

                  <div className="explore-card-actions">
                    <Link
                      className="explore-view-button"
                      to={`/project/${project.id}`}
                    >
                      View project <span>→</span>
                    </Link>

                    {currentUser && (
                      <>
                        <Link
                          className="explore-edit-button"
                          to={`/edit-project/${project.id}`}
                        >
                          Edit
                        </Link>

                        <button
                          className="explore-delete-button"
                          type="button"
                          onClick={() => handleDelete(project.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}

export default Projects;