import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [savedUser, setSavedUser] = useState(() => localStorage.getItem("currentUser"));

  useEffect(() => {
    setSavedUser(localStorage.getItem("currentUser"));
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setSavedUser(null);
    navigate("/login");
  };

  return (
    <header className="site-header">
      <nav className="navbar content-width">
        <Link to="/" className="navbar-brand"><span className="brand-mark">✳</span><span>Campus Project Hub<small>Find Skills. Build Projects.</small></span></Link>
        <div className="navbar-links">
          {!savedUser ? <>
            <a href="/#features">Features</a>
            <Link to="/projects">Explore Projects</Link>
            <Link to="/login" className="nav-signin">Sign in</Link>
            <Link to="/register" className="nav-get-started">Get Started <span>→</span></Link>
          </> : <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/profile">My Profile</Link>
            <Link to="/my-requests">My Requests</Link>
            <Link to="/join-requests">Join Requests</Link>
            <button className="nav-get-started" onClick={handleLogout}>Log out</button>
          </>}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
