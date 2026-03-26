import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      background: "#0f172a",
      color: "white"
    }}>
      
      {/* Logo */}
      <h2 style={{ margin: 0 }}>StudyOrbit 🚀</h2>

      {/* Navigation */}
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        <Link to="/teacher/login" style={{ color: "white", textDecoration: "none" }}>
          Teacher
        </Link>

        <Link to="/student/login" style={{ color: "white", textDecoration: "none" }}>
          Student
        </Link>
      </div>
    </div>
  );
}

export default Navbar;