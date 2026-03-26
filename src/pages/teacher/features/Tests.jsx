import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createOnlineTest,
  getOnlineTests,
  createOfflineTest,
  getOfflineTests,
  uploadOfflineResult,
  getStudents,
  getAllOnlineResults
} from "../../../services/batchService";

function Tests() {
  const { name } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [activeTab, setActiveTab] = useState("online");

  // ONLINE TEST
  const [onlineTitle, setOnlineTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [questions, setQuestions] = useState([
    { q: "", options: ["", "", "", ""], correct: "" }
  ]);
  const [onlineTests, setOnlineTests] = useState([]);

  // OFFLINE TEST
  const [offlineTitle, setOfflineTitle] = useState("");
  const [offlineDate, setOfflineDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [maxMarks, setMaxMarks] = useState("");
  const [offlineTests, setOfflineTests] = useState([]);

  // RESULT UPLOAD
  const [students, setStudents] = useState([]);
  const [selectedTest, setSelectedTest] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [marks, setMarks] = useState("");
  const [total, setTotal] = useState("");

  // 🔥 ALL ONLINE RESULTS
  const [allResults, setAllResults] = useState([]);

  const fetchAll = async () => {
    try {
      const [onlineRes, offlineRes, studentsRes] = await Promise.all([
        getOnlineTests(name),
        getOfflineTests(name),
        getStudents(user.institute_code)
      ]);

      setOnlineTests(onlineRes.data);
      setOfflineTests(offlineRes.data);
      setStudents(studentsRes.data);
    } catch (err) {
      console.log("Fetch tests error:", err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAllResults = async () => {
    try {
      const res = await getAllOnlineResults(name);
      setAllResults(res.data);
    } catch (err) {
      console.log("Fetch all results error:", err);
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { q: "", options: ["", "", "", ""], correct: "" }
    ]);
  };

  const handleCreateOnlineTest = async () => {
    try {
      await createOnlineTest({
        batch_id: name,
        title: onlineTitle,
        duration: Number(duration),
        questions
      });

      alert("Online test created successfully");
      setOnlineTitle("");
      setDuration("");
      setQuestions([{ q: "", options: ["", "", "", ""], correct: "" }]);
      fetchAll();
    } catch (err) {
      alert("Error creating test");
    }
  };

  const handleCreateOfflineTest = async () => {
    try {
      await createOfflineTest({
        batch_id: name,
        title: offlineTitle,
        date: offlineDate,
        start_time: startTime,
        end_time: endTime,
        max_marks: Number(maxMarks)
      });

      alert("Offline test scheduled");
      fetchAll();
    } catch (err) {
      alert("Error scheduling test");
    }
  };

  const handleUploadResult = async () => {
    try {
      await uploadOfflineResult({
        batch_id: name,
        test_title: selectedTest,
        student_email: selectedStudent,
        marks: Number(marks),
        total: Number(total)
      });

      alert("Result uploaded");
    } catch (err) {
      alert("Error uploading result");
    }
  };

  const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  marginBottom: "20px"
};

const questionCard = {
  border: "1px solid #e5e7eb",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px"
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const primaryBtn = {
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "white",
  fontWeight: "600",
  cursor: "pointer"
};

const resultCard = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px",
  marginTop: "10px",
  background: "#f8fafc",
  borderRadius: "10px"
};
  return (
  <div style={{ padding: "30px", background: "#f1f5f9", minHeight: "100vh" }}>
    <h1 style={{ marginBottom: "20px" }}>Tests</h1>

    {/* TABS */}
    <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
      {["online", "offline", "results"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          style={{
            padding: "10px 18px",
            borderRadius: "20px",
            border: "none",
            fontWeight: "600",
            cursor: "pointer",
            background: activeTab === tab ? "#2563eb" : "#e5e7eb",
            color: activeTab === tab ? "white" : "#111"
          }}
        >
          {tab.toUpperCase()}
        </button>
      ))}
    </div>

    {/* ONLINE */}
    {activeTab === "online" && (
      <div style={card}>
        <h2>Create Online Test</h2>

        <input style={input} placeholder="Test Title" onChange={(e) => setOnlineTitle(e.target.value)} />
        <input style={input} placeholder="Duration (minutes)" onChange={(e) => setDuration(e.target.value)} />

        {questions.map((q, i) => (
          <div key={i} style={questionCard}>
            <input style={input} placeholder={`Question ${i + 1}`} onChange={(e) => handleQuestionChange(i, "q", e.target.value)} />

            {q.options.map((opt, idx) => (
              <input key={idx} style={input} placeholder={`Option ${idx + 1}`} onChange={(e) => handleOptionChange(i, idx, e.target.value)} />
            ))}

            <input style={input} placeholder="Correct Answer" onChange={(e) => handleQuestionChange(i, "correct", e.target.value)} />
          </div>
        ))}

        <div style={{ display: "flex", gap: "10px" }}>
          <button style={primaryBtn} onClick={addQuestion}>Add Question</button>
          <button style={primaryBtn} onClick={handleCreateOnlineTest}>Create Test</button>
        </div>

        <hr style={{ margin: "20px 0" }} />

        <button style={primaryBtn} onClick={fetchAllResults}>
          View All Student Results
        </button>

        {allResults.map((r, i) => (
          <div key={i} style={resultCard}>
            <span>{r.student_email}</span>
            <span>{r.title}</span>
            <span style={{ fontWeight: "bold", color: "#2563eb" }}>
              {r.percentage}%
            </span>
          </div>
        ))}
      </div>
    )}

    {/* OFFLINE */}
    {activeTab === "offline" && (
      <div style={card}>
        <h2>Schedule Offline Test</h2>

        <input style={input} placeholder="Title" onChange={(e) => setOfflineTitle(e.target.value)} />
        <input style={input} type="date" onChange={(e) => setOfflineDate(e.target.value)} />
        <input style={input} type="time" onChange={(e) => setStartTime(e.target.value)} />
        <input style={input} type="time" onChange={(e) => setEndTime(e.target.value)} />
        <input style={input} placeholder="Max Marks" onChange={(e) => setMaxMarks(e.target.value)} />

        <button style={primaryBtn} onClick={handleCreateOfflineTest}>
          Schedule Test
        </button>
      </div>
    )}

    {/* RESULTS */}
    {activeTab === "results" && (
      <div style={card}>
        <h2>Upload Result</h2>

        <select style={input} onChange={(e) => setSelectedTest(e.target.value)}>
          <option>Select Test</option>
          {offlineTests.map((t, i) => (
            <option key={i}>{t.title}</option>
          ))}
        </select>

        <select style={input} onChange={(e) => setSelectedStudent(e.target.value)}>
          <option>Select Student</option>
          {students.map((s, i) => (
            <option key={i} value={s.email}>
              {s.name}
            </option>
          ))}
        </select>

        <input style={input} placeholder="Marks" onChange={(e) => setMarks(e.target.value)} />
        <input style={input} placeholder="Total" onChange={(e) => setTotal(e.target.value)} />

        <button style={primaryBtn} onClick={handleUploadResult}>
          Upload Result
        </button>
      </div>
    )}
  </div>
  );
}

export default Tests;