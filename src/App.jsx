import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import StudentLogin from "./pages/auth/StudentLogin";
import StudentSignup from "./pages/auth/StudentSignup";
import TeacherLogin from "./pages/auth/TeacherLogin";
import TeacherSignup from "./pages/auth/TeacherSignup";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import BatchDashboard from "./pages/teacher/BatchDashboard";
import StudentBatchDashboard from "./pages/student/BatchDashboard";
import TeacherNotes from "./pages/teacher/features/Notes";
import StudentNotes from "./pages/student/features/Notes";
import TeacherAttendance from "./pages/teacher/features/Attendance";
import StudentAttendance from "./pages/student/features/Attendance";

import TeacherAnnouncements from "./pages/teacher/features/Announcements";
import StudentAnnouncements from "./pages/student/features/Announcements";
// 🔥 ASSIGNMENTS
import TeacherAssignments from "./pages/teacher/features/Assignments";
import StudentAssignments from "./pages/student/features/Assignments";
import TeacherTests from "./pages/teacher/features/Tests";
import StudentTests from "./pages/student/features/Tests";




function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
  <Route path="/" element={<Home />} />

  <Route path="/student/login" element={<StudentLogin />} />
  <Route path="/student/signup" element={<StudentSignup />} />

  <Route path="/teacher/login" element={<TeacherLogin />} />
  <Route path="/teacher/signup" element={<TeacherSignup />} />

  <Route path="/student/dashboard" element={<StudentDashboard />} />
  <Route path="/teacher/dashboard" element={<TeacherDashboard />} />

  {/* 🔥 THIS LINE IMPORTANT */}
  <Route path="/teacher/batch/:name" element={<BatchDashboard />} />
  <Route path="/student/batch/:name" element={<StudentBatchDashboard />} />

  <Route path="/teacher/batch/:name/notes" element={<TeacherNotes />} />
<Route path="/student/batch/:name/notes" element={<StudentNotes />} />
{/* 🔥 ATTENDANCE */}
<Route path="/teacher/batch/:name/attendance" element={<TeacherAttendance />} />
<Route path="/student/batch/:name/attendance" element={<StudentAttendance />} />

{/* 🔥 ANNOUNCEMENTS */}
<Route path="/teacher/batch/:name/announcements" element={<TeacherAnnouncements />} />
<Route path="/student/batch/:name/announcements" element={<StudentAnnouncements />} />
<Route path="/teacher/batch/:name/assignments" element={<TeacherAssignments />} />
<Route path="/student/batch/:name/assignments" element={<StudentAssignments />} />
<Route path="/teacher/batch/:name/tests" element={<TeacherTests />} />
<Route path="/student/batch/:name/tests" element={<StudentTests />} />

</Routes>



      
    </Router>
  );
}

export default App;