import { useEffect, useState } from "react";
import axios from "axios";

function MyRequests() {
  const [joinRequests, setJoinRequests] = useState([]);

  useEffect(() => {
    const loadRequests = async () => {
      const savedUser = localStorage.getItem("currentUser");

      if (!savedUser) {
        return;
      }

      const currentUser = JSON.parse(savedUser);

      try {
        const response = await axios.get(
          "https://campus-project-hub-backend.onrender.com/api/join-requests"
        );

        const myRequests = response.data.filter(
          (request) =>
            request.studentName === currentUser.name
        );

        setJoinRequests(myRequests);
      } catch (error) {
        console.error(
          "Error fetching requests:",
          error
        );
      }
    };

    loadRequests();
  }, []);

  return (
    <div>
      <h1>My Join Requests</h1>

      <p>
        View the status of projects you have requested
        to join.
      </p>

      <hr />

      {joinRequests.length === 0 ? (
        <p>You have not sent any join requests.</p>
      ) : (
        joinRequests.map((request) => (
          <div key={request.id}>
            <h2>{request.projectTitle}</h2>

            <p>
              <strong>Your Name:</strong>{" "}
              {request.studentName}
            </p>

            <p>
              <strong>Your Skills:</strong>{" "}
              {request.skills}
            </p>

            <p>
              <strong>Project Owner:</strong>{" "}
              {request.ownerName}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {request.status}
            </p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default MyRequests;