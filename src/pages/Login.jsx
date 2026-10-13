import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "https://campus-project-hub-backend.onrender.com/api/users/login",
        user
      );

      localStorage.setItem(
        "currentUser",
        JSON.stringify(response.data)
      );

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        if (error.response.status === 400 ||
            error.response.status === 401) {
          alert("Invalid email or password.");
        } else if (error.response.status === 404) {
          alert("Login endpoint not found. Please check the backend API URL.");
        } else {
          alert(
            `Login failed. Server returned status ${error.response.status}.`
          );
        }
      } else if (error.request) {
        alert(
          "Cannot connect to the backend. Check that Spring Boot is running on https://campus-project-hub-backend.onrender.com and inspect the browser console for CORS errors."
        );
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-experience">
      <section className="login-story">
        <div className="login-eyebrow">
          <span className="eyebrow-spark">✦</span>
          STUDENT COLLABORATION PLATFORM
        </div>

        <h1>
          Your next great project <span>starts here.</span>
        </h1>

        <p className="login-lead">
          Find skilled teammates, explore exciting ideas, and turn your
          classroom concepts into real-world projects.
        </p>

        <div className="login-benefits">
          <div className="login-benefit">
            <span className="benefit-icon">⌕</span>
            <div>
              <b>Discover projects</b>
              <small>Explore ideas from students like you</small>
            </div>
          </div>

          <div className="login-benefit">
            <span className="benefit-icon">♧</span>
            <div>
              <b>Meet teammates</b>
              <small>Find the right skills for your team</small>
            </div>
          </div>

          <div className="login-benefit">
            <span className="benefit-icon">✧</span>
            <div>
              <b>Build your portfolio</b>
              <small>Showcase your work and grow</small>
            </div>
          </div>
        </div>

        <div
          className="login-illustration"
          aria-label="Project collaboration illustration"
        >
          <div className="illustration-orbit orbit-one"></div>
          <div className="illustration-orbit orbit-two"></div>

          <div className="float-skill skill-react">
            <span>⚛</span> React
          </div>
          <div className="float-skill skill-iot">
            <span>⌁</span> IoT
          </div>
          <div className="float-skill skill-code">
            <span>‹/›</span> Verilog
          </div>

          <div className="float-project project-one">
            <span className="mini-project-icon">✦</span>
            <div>
              <b>Smart Campus App</b>
              <small>Team project</small>
            </div>
            <em>Active</em>
          </div>

          <div className="float-project project-two">
            <span className="mini-project-icon mint">⌘</span>
            <div>
              <b>IoT Smart Classroom</b>
              <small>4 members collaborating</small>
            </div>
          </div>

          <div className="collab-stage">
            <div className="collab-sun"></div>

            <div className="laptop">
              <div className="laptop-screen">
                <span>CP</span>
                <i></i>
                <i></i>
                <i></i>
              </div>
              <div className="laptop-base"></div>
            </div>

            <div className="student student-left">
              <span className="student-hair"></span>
              <span className="student-face">●</span>
              <span className="student-body"></span>
            </div>

            <div className="student student-center">
              <span className="student-hair"></span>
              <span className="student-face">●</span>
              <span className="student-body"></span>
            </div>

            <div className="student student-right">
              <span className="student-hair"></span>
              <span className="student-face">●</span>
              <span className="student-body"></span>
            </div>

            <div className="plant">
              <i></i>
              <i></i>
              <i></i>
              <span></span>
            </div>
          </div>

          <div className="collab-caption">
            <span className="avatar-bubbles">
              <i>A</i>
              <i>S</i>
              <i>R</i>
              <i>+</i>
            </span>
            <span>
              <b>Better ideas happen together.</b>
              <small>
                Build something meaningful with your campus community.
              </small>
            </span>
          </div>
        </div>
      </section>

      <section className="login-panel-wrap">
        <div className="login-panel">
          <div className="login-brand-icon">✳</div>

          <p className="login-panel-kicker">WELCOME BACK</p>

          <h2>Sign in to continue</h2>

          <p className="login-panel-description">
            Your next collaboration is just one step away.
          </p>

          <form className="creative-login-form" onSubmit={handleSubmit}>
            <label htmlFor="login-email">Email address</label>

            <div className="login-input-wrap">
              <span aria-hidden="true">✉</span>
              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={user.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <label htmlFor="login-password">Password</label>

            <div className="login-input-wrap">
              <span aria-hidden="true">♙</span>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={user.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />

              <button
                className="password-toggle"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              className="creative-login-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
              {!loading && <span> →</span>}
            </button>
          </form>

          <div className="login-divider">
            <span></span>
            Secure student sign in
            <span></span>
          </div>

          <div className="student-note">
            <span>✦</span>
            <p>
              <b>Made for student builders</b>
              <small>
                Use your registered Campus Project Hub account.
              </small>
            </p>
          </div>

          <p className="login-register-prompt">
            New to Campus Project Hub?{" "}
            <Link to="/register">
              Create an account <span>↗</span>
            </Link>
          </p>
        </div>

        <p className="login-panel-footnote">
          <span>●</span>
          A campus community for ideas, skills, and teamwork
        </p>
      </section>
    </main>
  );
}

export default Login;