import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();

  const savedUser = localStorage.getItem("currentUser");

  let currentUser = null;

  try {
    currentUser = savedUser ? JSON.parse(savedUser) : null;
  } catch {
    currentUser = null;
  }

  const [profile, setProfile] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    branch: currentUser?.branch || "",
    year: currentUser?.year ?? "",
    skills: currentUser?.skills || "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setProfile((previousProfile) => ({
      ...previousProfile,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (!currentUser) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    if (!currentUser.id) {
      alert("User ID is missing. Please log out and log in again.");
      return;
    }

    setSaving(true);

    try {
      const response = await axios.put(
        `https://campus-project-hub-backend.onrender.com/api/users/${currentUser.id}`,
        {
          ...profile,
          year: profile.year === "" ? null : Number(profile.year),
        }
      );

      const updatedUser = {
        ...currentUser,
        ...response.data,
      };

      localStorage.setItem(
        "currentUser",
        JSON.stringify(updatedUser)
      );

      alert("Profile saved successfully!");
    } catch (error) {
      console.error(
        "Profile update error:",
        error.response?.data || error.message
      );

      if (error.code === "ERR_NETWORK") {
        alert(
          "Cannot connect to the backend. Check that Spring Boot is running on port 8080."
        );
      } else if (error.response?.status === 404) {
        alert("User not found. Please log in again.");
      } else if (error.response?.status === 400) {
        alert("Invalid profile details. Please check your entries.");
      } else {
        alert("Failed to save profile. Check the backend terminal for details.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1>My Profile</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={profile.name}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={profile.branch}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="number"
          name="year"
          placeholder="Year"
          min="1"
          max="8"
          value={profile.year}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <h3>Technical Skills</h3>

        <input
          type="text"
          name="skills"
          placeholder="Example: Verilog, Java, React"
          value={profile.skills}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

export default Profile;