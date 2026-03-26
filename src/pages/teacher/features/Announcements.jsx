import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  getAnnouncements,
  sendAnnouncement
} from "../../../services/batchService";

function Announcements() {
  const { name } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [msg, setMsg] = useState("");
  const [list, setList] = useState([]);

  const chatRef = useRef();

  const fetch = async () => {
    const res = await getAnnouncements(name);
    setList(res.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [list]);

  const handleSend = async () => {
    if (!msg) return;

    await sendAnnouncement({
      batch_id: name,
      message: msg,
      sender: user.role,
      name: user.name
    });

    setMsg("");
    fetch();
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "90vh",
      background: "#f1f5f9"
    }}>

      {/* HEADER */}
      <div style={{
        padding: "15px",
        background: "#0f172a",
        color: "white",
        fontWeight: "bold"
      }}>
        Announcements
      </div>

      {/* CHAT AREA */}
      <div
        ref={chatRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px"
        }}
      >
        {list.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent:
                m.sender === user.role ? "flex-end" : "flex-start",
              marginBottom: "10px"
            }}
          >
            <div style={{
              maxWidth: "60%",
              background:
                m.sender === user.role ? "#2563eb" : "#e2e8f0",
              color:
                m.sender === user.role ? "white" : "black",
              padding: "10px",
              borderRadius: "12px"
            }}>
              <div style={{
                fontSize: "12px",
                fontWeight: "bold"
              }}>
                {m.name}
              </div>

              <div>{m.message}</div>

              <div style={{
                fontSize: "10px",
                textAlign: "right",
                marginTop: "5px"
              }}>
                {m.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div style={{
        display: "flex",
        padding: "10px",
        borderTop: "1px solid #ccc"
      }}>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={handleSend}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Announcements;