import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createBatch,
  getTeacherBatches
} from "../../services/batchService";

function TeacherDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [batchName, setBatchName] = useState("");
  const [batches, setBatches] = useState([]);

  // 👉 fetch batches
  const fetchBatches = async () => {
    try {
      const res = await getTeacherBatches(user.email);
      setBatches(res.data);
    } catch (err) {
      console.log("Fetch batches error:", err);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  // 👉 create batch
  const handleCreate = async () => {
    if (!batchName) return alert("Enter batch name");

    try {
      const res = await createBatch({
        name: batchName,
        teacher_email: user.email
      });

      alert("Batch created");

      setBatchName("");
      fetchBatches();
    } catch (err) {
      console.log("Create batch error:", err);
      alert("Error creating batch");
    }
  };

  if (!user) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Please login again
      </h2>
    );
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center" }}>Welcome Teacher</h1>
      <p style={{ textAlign: "center" }}>{user.name}</p>

      {/* 🔥 CREATE BATCH */}
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <h3>Create Batch</h3>

        <input
          type="text"
          placeholder="Enter Batch Name"
          value={batchName}
          onChange={(e) => setBatchName(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            marginRight: "10px"
          }}
        />

        <button
          onClick={handleCreate}
          style={{
            padding: "10px 20px",
            background: "#0f172a",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Create
        </button>
      </div>

      {/* 🔥 BATCH LIST */}
      <div style={{ marginTop: "50px" }}>
        <h3>Your Batches</h3>

        {batches.length === 0 ? (
          <p>No batches yet</p>
        ) : (
          batches.map((batch, index) => (
            <div
              key={index}
              onClick={() => navigate(`/teacher/batch/${batch._id}`)}
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
    </div>
  );
}

export default TeacherDashboard;