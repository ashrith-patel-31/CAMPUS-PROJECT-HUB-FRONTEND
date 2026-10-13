import { useEffect, useState } from "react";
import axios from "axios";

function JoinRequests() {
  const [joinRequests, setJoinRequests] = useState([]);

  const savedUser = localStorage.getItem("currentUser");

  const currentUser = savedUser
    ? JSON.parse(savedUser)
    : null;

  const loadRequests = async () => {
    try {
      const response = await axios.get(
        "https://campus-project-hub-backend.onrender.com/api/join-requests"
      );

      // Show only requests for projects owned by
      // the currently logged-in student.
      const ownerRequests = currentUser
        ? response.data.filter(
            (request) =>
              request.ownerId === currentUser.id
          )
        : [];

      setJoinRequests(ownerRequests);
    } catch (error) {
      console.error(
        "Error fetching join requests:",
        error
      );
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleRequest = async (id, status) => {
    try {
      const response = await axios.put(
        `https://campus-project-hub-backend.onrender.com/api/join-requests/${id}/status?status=${status}`
      );

      const updatedRequests = joinRequests.map(
        (request) =>
          request.id === id
            ? response.data
            : request
      );

      setJoinRequests(updatedRequests);

      alert(`Request ${status.toLowerCase()} successfully!`);
    } catch (error) {
      console.error(
        "Error updating request:",
        error
      );

      alert("Failed to update request.");
    }
  };

  return (
    <div>
      <h1>Join Requests</h1>

      <p>
        Manage requests from students who want to
        join your projects.
      </p>

      <hr />

      {joinRequests.length === 0 ? (
        <p>No join requests for your projects.</p>
      ) : (
        joinRequests.map((request) => (
          <div key={request.id}>
            <h2>{request.projectTitle}</h2>

            <p>
              <strong>Student:</strong>{" "}
              {request.studentName}
            </p>

            <p>
              <strong>Skills:</strong>{" "}
              {request.skills}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {request.status}
            </p>

            {request.status === "Pending" && (
              <>
                <button
                  onClick={() =>
                    handleRequest(
                      request.id,
                      "Accepted"
                    )
                  }
                >
                  Accept
                </button>

                {" "}

                <button
                  onClick={() =>
                    handleRequest(
                      request.id,
                      "Rejected"
                    )
                  }
                >
                  Reject
                </button>
              </>
            )}

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default JoinRequests;