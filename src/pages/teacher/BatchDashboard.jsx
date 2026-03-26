import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getStudents,
  addStudentToBatch
} from "../../services/batchService";

function BatchDashboard() {
  const { name } = useParams(); // this is batch_id
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [students, setStudents] = useState([]);

  const features = [
    "Notes",
    "Assignments",
    "Tests",
    "Attendance",
    "Announcements",
    
  ];

  const fetchStudents = async () => {
    try {
      if (!user?.institute_code) return;
      const res = await getStudents(user.institute_code);
      setStudents(res.data);
      console.log("Students fetched:", res.data);
    } catch (err) {
      console.log("Fetch students error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAdd = async (email) => {
    try {
      console.log("Add clicked for:", email, "batch_id:", name);

      const res = await addStudentToBatch({
        batch_id: name,
        student_email: email
      });

      console.log("Add student response:", res.data);
      alert(res.data.message || "Student added successfully");
    } catch (err) {
      console.log("Add student error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error adding student");
    }
  };

 const handleFeatureClick = (feature) => {
  const routes = {
    "Notes": `/teacher/batch/${name}/notes`,
    "Assignments": `/teacher/batch/${name}/assignments`,
    "Tests": `/teacher/batch/${name}/tests`,
    "Attendance": `/teacher/batch/${name}/attendance`,
    "Announcements": `/teacher/batch/${name}/announcements`,
    
  };

  navigate(routes[feature]);
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
      <h1 style={{ textAlign: "center" }}>Batch Dashboard</h1>

      <div style={{ marginTop: "40px" }}>
        <h3>Add Students</h3>

        {students.length === 0 ? (
          <p>No students found</p>
        ) : (
          students.map((s, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                marginBottom: "10px",
                background: "#fff"
              }}
            >
              <span>
                {s.name} ({s.email})
              </span>

              <button
                type="button"
                onClick={() => handleAdd(s.email)}
                style={{
                  padding: "8px 14px",
                  cursor: "pointer",
                  background: "#0f172a",
                  color: "white",
                  border: "none",
                  borderRadius: "6px"
                }}
              >
                Add
              </button>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: "50px" }}>
        <h3>Features</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginTop: "20px"
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => handleFeatureClick(feature)}
              style={{
                padding: "20px",
                background: "#1e293b",
                color: "white",
                borderRadius: "10px",
                textAlign: "center",
                cursor: "pointer"
              }}
            >
              <h3>{feature}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BatchDashboard;