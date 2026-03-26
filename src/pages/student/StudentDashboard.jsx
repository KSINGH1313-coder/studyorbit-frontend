import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentBatches } from "../../services/batchService";

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [batches, setBatches] = useState([]);

  const fetchBatches = async () => {
    try {
      if (!user?.email) return;
      const res = await getStudentBatches(user.email);
      console.log("Student batches:", res.data);
      setBatches(res.data);
    } catch (err) {
      console.log("Fetch batches error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  if (!user) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Please login again</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center" }}>Welcome Student</h1>
      <p style={{ textAlign: "center" }}>{user.name}</p>

      <h3 style={{ marginTop: "40px" }}>Your Batches</h3>

      {batches.length === 0 ? (
        <p>No batches joined</p>
      ) : (
        batches.map((batch) => (
          <div
            key={batch._id}
            onClick={() => navigate(`/student/batch/${batch._id}`)}
            style={{
              padding: "15px",
              marginTop: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              cursor: "pointer",
              background: "#f8fafc"
            }}
          >
            {batch.name}
          </div>
        ))
      )}
    </div>
  );
}

export default StudentDashboard;