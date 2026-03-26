import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAssignments,
  submitAssignment
} from "../../../services/batchService";

function Assignments() {
  const { name } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [list, setList] = useState([]);
  const [answers, setAnswers] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const res = await getAssignments(name);
    setList(res.data);
  };

  const handleSubmit = async (title) => {
    const formData = new FormData();

    formData.append("batch_id", name);
    formData.append("assignment_title", title);
    formData.append("student_email", user.email);
    formData.append("answer", answers[title]);

    if (file) {
      formData.append("file", file);
    }

    await submitAssignment(formData);

    alert("Submitted");
  };

  const isDeadlinePassed = (deadline) => {
    const today = new Date();
    const d = new Date(deadline);
    return today > d;
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Assignments</h1>

      {list.map((a, i) => (
        <div key={i} style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "10px" }}>
          <b>{a.title}</b>
          <p>{a.description}</p>
          <p>Deadline: {a.deadline}</p>

          {a.file && (
            <a
              href={`http://127.0.0.1:5000/uploads/${a.file}`}
              target="_blank"
            >
              View PDF
            </a>
          )}

          {isDeadlinePassed(a.deadline) ? (
            <p style={{ color: "red" }}>Deadline Passed</p>
          ) : (
            <>
              <input
                placeholder="Your answer"
                onChange={(e) =>
                  setAnswers({ ...answers, [a.title]: e.target.value })
                }
              /><br />

              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              /><br />

              <button onClick={() => handleSubmit(a.title)}>
                Submit
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Assignments;