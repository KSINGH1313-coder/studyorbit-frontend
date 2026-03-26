import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getOnlineTests,
  submitOnlineTest,
  getOnlineResults,
  getOfflineTests,
  getOfflineResults,
  getOfflineLeaderboard
} from "../../../services/batchService";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function Tests() {
  const { name } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [activeTab, setActiveTab] = useState("online");

  const [onlineTests, setOnlineTests] = useState([]);
  const [offlineTests, setOfflineTests] = useState([]);
  const [results, setResults] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  const [answers, setAnswers] = useState([]);
  const [activeTest, setActiveTest] = useState(null);

  const [time, setTime] = useState(0);

  const fetch = async () => {
    const t = await getOnlineTests(name);
    const r = await getOnlineResults(name, user.email);
    const off = await getOfflineTests(name);
    const offRes = await getOfflineResults(name, user.email);
    const lb = await getOfflineLeaderboard(name);

    setOnlineTests(t.data);
    setResults([...r.data, ...offRes.data]);
    setOfflineTests(off.data);
    setLeaderboard(lb.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  // TIMER
  useEffect(() => {
    if (time <= 0) return;

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    if (time === 0 && activeTest) {
      handleSubmit(activeTest, true);
    }
  }, [time]);

  const startTest = (test) => {
    setActiveTest(test);
    setAnswers([]);
    setTime(test.duration * 60);
  };

  const handleSubmit = async (test, auto = false) => {
    const res = await submitOnlineTest({
      batch_id: name,
      student_email: user.email,
      title: test.title,
      questions: test.questions,
      answers
    });

    alert(
      auto
        ? "Time up! Auto submitted"
        : `Score: ${res.data.score}/${res.data.total}`
    );

    setActiveTest(null);
    fetch();
  };

  const formatTime = () => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div style={{ padding: "30px", background: "#f1f5f9", minHeight: "100vh" }}>
      <h1>Tests</h1>

      {/* TABS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {["online", "schedule", "leaderboard", "analytics"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 15px",
              borderRadius: "20px",
              border: "none",
              background: activeTab === tab ? "#2563eb" : "#e5e7eb",
              color: activeTab === tab ? "white" : "black"
            }}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ONLINE TEST */}
      {activeTab === "online" && (
        <div style={card}>
          {!activeTest ? (
            <>
              <h2>Available Tests</h2>

              {onlineTests.map((t, i) => (
                <div key={i} style={testCard}>
                  <b>{t.title}</b>
                  <p>{t.duration} mins</p>
                  <button style={primaryBtn} onClick={() => startTest(t)}>
                    Start Test
                  </button>
                </div>
              ))}
            </>
          ) : (
            <div>
              <h2>{activeTest.title}</h2>

              <div style={timer}>
                ⏱ {formatTime()}
              </div>

              {activeTest.questions.map((q, idx) => (
                <div key={idx} style={questionCard}>
                  <p><b>{q.q}</b></p>

                  {q.options.map((opt, i) => (
                    <div key={i}>
                      <input
                        type="radio"
                        name={`q${idx}`}
                        onChange={() => {
                          const arr = [...answers];
                          arr[idx] = opt;
                          setAnswers(arr);
                        }}
                      />
                      {opt}
                    </div>
                  ))}
                </div>
              ))}

              <button style={primaryBtn} onClick={() => handleSubmit(activeTest)}>
                Submit Test
              </button>
            </div>
          )}
        </div>
      )}

      {/* SCHEDULE */}
      {activeTab === "schedule" && (
        <div style={card}>
          <h2>Upcoming Tests</h2>

          {offlineTests.map((t, i) => (
            <div key={i} style={testCard}>
              <b>{t.title}</b>
              <p>{t.date}</p>
              <p>{t.start_time} - {t.end_time}</p>
            </div>
          ))}
        </div>
      )}

      {/* LEADERBOARD */}
      {activeTab === "leaderboard" && (
        <div style={card}>
          <h2>Leaderboard</h2>

          {leaderboard.map((l, i) => (
            <div key={i} style={resultCard}>
              <span>#{i + 1}</span>
              <span>{l.student_email}</span>
              <span>{l.percentage}%</span>
            </div>
          ))}
        </div>
      )}

      {/* ANALYTICS */}
      {activeTab === "analytics" && (
        <div style={card}>
          <h2>Performance</h2>

          <LineChart width={500} height={300} data={results}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="percentage" stroke="#2563eb" />
          </LineChart>
        </div>
      )}
    </div>
  );
}

export default Tests;

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
};

const testCard = {
  padding: "15px",
  marginTop: "10px",
  background: "#f8fafc",
  borderRadius: "10px"
};

const questionCard = {
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  marginTop: "10px"
};

const primaryBtn = {
  padding: "10px 15px",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  marginTop: "10px"
};

const resultCard = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
  marginTop: "10px",
  background: "#f1f5f9",
  borderRadius: "10px"
};

const timer = {
  background: "#dc2626",
  color: "white",
  padding: "5px 10px",
  borderRadius: "8px",
  marginBottom: "10px",
  display: "inline-block"
};