import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addNote, getNotes } from "../../../services/batchService";

function Notes() {
  const { name } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await getNotes(name);
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

const handleAdd = async () => {
  try {
    if (!title || !description) {
      return alert("Fill all fields");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("batch_id", name); // 🔥 FIX

    if (file) {
      formData.append("file", file);
    }

    console.log("Sending note...");

    const res = await addNote(formData);

    console.log("Response:", res.data);

    alert("Note added successfully");

    setTitle("");
    setDescription("");
    setFile(null);

    fetchNotes();

  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);
    alert("Error adding note");
  }
};

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Notes</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br /><br />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br /><br />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      /><br /><br />

      <button onClick={handleAdd}>Add Note</button>

      <h3 style={{ marginTop: "30px" }}>All Notes</h3>

      {notes.map((note, index) => (
        <div key={index}>
          <b>{note.title}</b>
          <p>{note.description}</p>
          {note.file && (
            <a
  href={`https://studyorbit-backend.onrender.com/uploads/${note.file}`}
  target="_blank"
>
  View PDF
</a>
          )}
        </div>
      ))}
    </div>
  );
}

export default Notes;