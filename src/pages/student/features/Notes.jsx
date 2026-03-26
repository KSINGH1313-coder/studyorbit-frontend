import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNotes } from "../../../services/batchService";

function Notes() {
  const { name } = useParams(); // 🔥 this is batch_id
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      console.log("Fetching notes for batch_id:", name); // 🔥 debug

      const res = await getNotes(name);

      console.log("Notes response:", res.data); // 🔥 debug

      setNotes(res.data);
    } catch (err) {
      console.log("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Notes</h1>

      {notes.length === 0 ? (
        <p>No notes available</p>
      ) : (
        notes.map((note, index) => (
          <div key={index} style={{ marginTop: "20px" }}>
            <b>{note.title}</b>
            <p>{note.description}</p>

            {note.file && (
              <a
                href={`http://127.0.0.1:5000/uploads/${note.file}`}
                target="_blank"
              >
                Download PDF
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Notes;