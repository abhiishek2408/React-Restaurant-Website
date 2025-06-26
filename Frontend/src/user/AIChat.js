import React, { useState } from "react";

export default function AIChat({ closeModal }) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResponse("❗ Please type something before asking.");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost/onlinerestro/backend/ai_chat.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: trimmed }),
      });

      const raw = await res.text();

      try {
        const data = JSON.parse(raw);

        if (data.error) {
          setResponse(`⚠️ API Error: ${data.details || data.error}`);
        } else {
          setResponse(data.reply);
        }
      } catch (err) {
        setResponse("❌ Server returned invalid JSON:\n\n" + raw);
      }
    } catch (err) {
      setResponse("❌ Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <span style={styles.closeButton} onClick={closeModal}>
          &times;
        </span>
        <h2 style={styles.title}>Ask our AI Assistant</h2>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask something about the menu..."
          style={styles.input}
          disabled={loading}
        />

        <button onClick={askAI} style={styles.button} disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>

        {response && <p style={styles.response}>{response}</p>}
      </div>
    </div>
  );
}

const styles = {
  modal: {
    position: "fixed",
    zIndex: 1000,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: "10% auto",
    padding: "30px",
    border: "1px solid #888",
    width: "90%",
    maxWidth: "500px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  closeButton: {
    color: "#aaa",
    float: "right",
    fontSize: "28px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  title: {
    marginBottom: "15px",
    color: "#333",
  },
  input: {
    width: "90%",
    padding: "10px",
    margin: "15px 0",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  response: {
    marginTop: "20px",
    background: "#f1f1f1",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    color: "#444",
    whiteSpace: "pre-wrap",
  },
};
