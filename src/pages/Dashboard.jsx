import { Link } from "react-router-dom";

function Dashboard() {
  const savedUser = localStorage.getItem("currentUser");
  const currentUser = savedUser ? JSON.parse(savedUser) : null;

  return (
    <div className="dashboard-page">
      <section className="dashboard-header">
      <span className="dashboard-tag">STUDENT COLLABORATION PLATFORM</span>
      <h1>Welcome to Campus Project Hub</h1>

      {currentUser && (
        <p>
          <strong>Welcome, {currentUser.name}!</strong>
        </p>
      )}

      <p>
        Find projects, showcase your skills, and collaborate with other students.
      </p>
      </section>

      <h2>Quick Actions</h2>

      <div className="dashboard-grid">
        <Link className="dashboard-card" to="/projects">
          <div className="dashboard-icon">⌕</div><h2>Explore Projects</h2><p>Discover ideas and find projects that match your interests.</p><span>Browse projects →</span>
        </Link>

        {" "}

        <Link className="dashboard-card" to="/create-project">
          <div className="dashboard-icon">＋</div><h2>Create a Project</h2><p>Share your idea and invite students to collaborate.</p><span>Start building →</span>
        </Link>

        {" "}

        <Link className="dashboard-card" to="/profile">
          <div className="dashboard-icon">♙</div><h2>My Profile</h2><p>Showcase your skills and academic background.</p><span>Update profile →</span>
        </Link>

        {" "}

        <Link className="dashboard-card" to="/my-requests">
          <div className="dashboard-icon">↗</div><h2>My Requests</h2><p>Track the status of the projects you want to join.</p><span>View requests →</span>
        </Link>

        {" "}

        <Link className="dashboard-card" to="/join-requests">
          <div className="dashboard-icon">♧</div><h2>Join Requests</h2><p>Review students who want to join your projects.</p><span>Manage team →</span>
        </Link>
      </div>

      <section className="dashboard-header" style={{marginTop: 30}}>
        <h2>Build better projects, together.</h2>
        <p>Create projects, find teammates with the right skills, and keep every collaboration organized in one place.</p>
      </section>
    </div>
  );
}

export default Dashboard;