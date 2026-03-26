import { useParams, useNavigate } from "react-router-dom";

function BatchDashboard() {
  const { name } = useParams(); // this is batch_id
  const navigate = useNavigate();

  const features = [
    "Notes",
    "Assignments",
    "Tests",
    "Attendance",
    "Announcements",
    
  ];

 const handleClick = (feature) => {
  const routes = {
    "Notes": `/student/batch/${name}/notes`,
    "Assignments": `/student/batch/${name}/assignments`,
    "Tests": `/student/batch/${name}/tests`,
    "Attendance": `/student/batch/${name}/attendance`,
    "Announcements": `/student/batch/${name}/announcements`,
    
  };

  navigate(routes[feature]);
};

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center" }}>Batch Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "40px"
        }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={() => handleClick(feature)}
            style={{
              padding: "20px",
              background: "#0f172a",
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
  );
}

export default BatchDashboard;