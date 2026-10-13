import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import EditProject from "./pages/EditProject";
import ProjectDetails from "./pages/ProjectDetails";
import JoinRequests from "./pages/JoinRequests";
import MyRequests from "./pages/MyRequests";

import Navbar from "./components/Navbar";

function App() {
  const [projects, setProjects] = useState([]);

  const [joinRequests, setJoinRequests] = useState(() => {
    const savedRequests = localStorage.getItem("joinRequests");

    return savedRequests ? JSON.parse(savedRequests) : [];
  });

  // Load projects from Spring Boot backend
  useEffect(() => {
    axios
      .get("https://campus-project-hub-backend.onrender.com/api/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/profile" element={<Profile />} />

          <Route
            path="/projects"
            element={
              <Projects
                projects={projects}
                setProjects={setProjects}
              />
            }
          />

          <Route
            path="/create-project"
            element={
              <CreateProject
                projects={projects}
                setProjects={setProjects}
              />
            }
          />

          <Route
            path="/edit-project/:id"
            element={
              <EditProject
                projects={projects}
                setProjects={setProjects}
              />
            }
          />

          <Route
            path="/project/:id"
            element={
              <ProjectDetails
                projects={projects}
                joinRequests={joinRequests}
                setJoinRequests={setJoinRequests}
              />
            }
          />

          <Route
            path="/join-requests"
            element={
              <JoinRequests
                joinRequests={joinRequests}
                setJoinRequests={setJoinRequests}
              />
            }
          />

          <Route
            path="/my-requests"
            element={<MyRequests />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;