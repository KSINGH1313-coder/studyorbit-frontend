import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentAttendance } from "../../../services/batchService";

function Attendance() {
  const { name } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getStudentAttendance(name, user.email);
    setRecords(res.data);
  };

  // 🔥 create map
  const attendanceMap = {};
  records.forEach((r) => {
    attendanceMap[r.date] = r.status;
  });

  // 🔥 generate current month
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 1; i <= daysInMonth; i++) {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    days.push(date);
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center" }}>Monthly Attendance</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
          marginTop: "30px"
        }}
      >
        {days.map((day, index) => {
          const status = attendanceMap[day];

          return (
            <div
              key={index}
              style={{
                padding: "15px",
                textAlign: "center",
                borderRadius: "8px",
                background:
                  status === "present"
                    ? "green"
                    : status === "absent"
                    ? "red"
                    : "#1e293b",
                color: "white"
              }}
            >
              <div>{day.split("-")[2]}</div>
              <div style={{ fontSize: "12px" }}>
                {status || "-"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Attendance;