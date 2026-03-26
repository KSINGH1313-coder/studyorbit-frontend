import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  createAssignment,
  getAssignments,
  getSubmissions
} from "../../../services/batchService";

function Assignments() {
  const { name } = useParams(); // batch_id

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState("");
  const [file, setFile] = useState(null);

  const [list, setList] = useState([]);

  const [selected, setSelected] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  const fetch = async () => {
    const res = await getAssignments(name);
    setList(res.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleCreate = async () => {
    const formData = new FormData();

    formData.append("batch_id", name);
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("deadline", deadline);

    if (file) {
      formData.append("file", file);
    }

    await createAssignment(formData);

    setTitle("");
    setDesc("");
    setDeadline("");
    setFile(null);

    fetch();
  };

  const handleView = async (title) => {
    setSelected(title);
    const res = await getSubmissions(name, title);
    setSubmissions(res.data);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Assignments</h1>

      {/* CREATE */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br />

        <input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        /><br />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        /><br />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        /><br />

        <button onClick={handleCreate}>Create Assignment</button>
      </div>

      {/* LIST */}
      {list.map((a, i) => (
        <div key={i} style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "10px" }}>
          <b>{a.title}</b>
          <p>{a.description}</p>
          <p>Deadline: {a.deadline}</p>

          {a.file && (
            <a
  href={`https://studyorbit-backend.onrender.com/uploads/${a.file}`}
  target="_blank"
>
  View PDF
</a>
          )}

          <br />

          <button onClick={() => handleView(a.title)}>
            View Submissions
          </button>
        </div>
      ))}

      {/* SUBMISSIONS */}
      {selected && (
        <div style={{ marginTop: "30px" }}>
          <h2>Submissions for {selected}</h2>

          {submissions.length === 0 ? (
            <p>No submissions yet</p>
          ) : (
            submissions.map((s, i) => (
              <div key={i} style={{ marginBottom: "10px", border: "1px solid #ccc", padding: "10px" }}>
                <p><b>{s.student_email}</b></p>
                <p>{s.answer}</p>

                {s.file && (
                  <a
  href={`https://studyorbit-backend.onrender.com/uploads/${s.file}`}
  target="_blank"
>
  View PDF
</a>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Assignments;