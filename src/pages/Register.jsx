import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    year: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://campus-project-hub-backend.onrender.com/api/users/register",
        {
          ...user,
          year: Number(user.year),
        }
      );

      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response?.status === 400) {
        alert("Registration failed. Check your details or whether the email is already registered.");
      } else if (error.code === "ERR_NETWORK") {
        alert("alert("Unable to connect to the server. Please try again later.");");
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  };

  return (
    <main className="register-page">
      <section className="register-intro">
        <span className="register-pill">
          <span className="register-pill-dot" />
          STUDENT COLLABORATION
        </span>

        <h1>
          Your next big idea starts <span>here.</span>
        </h1>

        <p>
          Create your student profile, share your skills, and find teammates
          to build something meaningful.
        </p>

        <div className="register-benefits">
          <div>
            <span className="register-benefit-icon">✦</span>
            <span>
              <strong>Meet teammates</strong>
              <small>Connect with students like you</small>
            </span>
          </div>

          <div>
            <span className="register-benefit-icon">⌘</span>
            <span>
              <strong>Show your skills</strong>
              <small>Find projects that fit your interests</small>
            </span>
          </div>

          <div>
            <span className="register-benefit-icon">↗</span>
            <span>
              <strong>Build together</strong>
              <small>Turn ideas into real projects</small>
            </span>
          </div>
        </div>
      </section>

      <section className="register-card">
        <div className="register-card-mark">✳</div>
        <p className="register-overline">GET STARTED — IT'S FREE</p>
        <h2>Create your account</h2>
        <p className="register-card-subtitle">
          A few details and you’re ready to go.
        </p>

        <form onSubmit={handleSubmit} className="register-form">
          <label>
            Full name
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={user.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </label>

          <label>
            Email address
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={user.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={user.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </label>

          <div className="register-form-row">
            <label>
              Branch
              <input
                type="text"
                name="branch"
                placeholder="e.g. ECE"
                value={user.branch}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Year
              <input
                type="number"
                name="year"
                placeholder="e.g. 3"
                min="1"
                max="8"
                value={user.year}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <button className="register-submit" type="submit">
            Create account <span>→</span>
          </button>
        </form>

        <p className="register-login-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;