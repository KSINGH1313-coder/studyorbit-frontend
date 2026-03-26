import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudents, markAttendance } from "../../../services/batchService";

function Attendance() {
  const { name } = useParams(); // batch_id
  const user = JSON.parse(localStorage.getItem("user"));

  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await getStudents(user.institute_code);
    setStudents(res.data);
  };

  const handleMark = async (email, status) => {
    await markAttendance({
      batch_id: name,
      student_email: email,
      status,
      date // 🔥 send selected date
    });

    alert(`Marked ${status}`);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center" }}>Attendance</h1>

      {/* 🔥 DATE PICKER */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: "8px" }}
        />
      </div>

      {students.map((s, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px"
          }}
        >
          <span>{s.name}</span>

          <div>
            <button
              onClick={() => handleMark(s.email, "present")}
              style={{ marginRight: "10px", background: "green", color: "white" }}
            >
              Present
            </button>

            <button
              onClick={() => handleMark(s.email, "absent")}
              style={{ background: "red", color: "white" }}
            >
              Absent
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Attendance;