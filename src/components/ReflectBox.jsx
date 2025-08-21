import React, { useState, useEffect } from "react";
import "../styles/ReflectBox.css";

function loadReflections() {
  try {
    const saved = JSON.parse(localStorage.getItem("reflections") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function ReflectBox() {
  const [input, setInput] = useState("");
  const [reflections, setReflections] = useState([]);

  useEffect(() => {
    setReflections(loadReflections());
  }, []);

  useEffect(() => {
    localStorage.setItem("reflections", JSON.stringify(reflections));
  }, [reflections]);

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const newEntry = {
      text: trimmed,
      date: new Date().toLocaleString(),
      id: Date.now(),
    };
    setReflections([newEntry, ...reflections]);
    setInput("");
  };

  const handleDelete = (id) => {
    setReflections(reflections.filter((r) => r.id !== id));
  };

return (
    <div className="reflect-container">
      <div className="reflect-header">
        <h2 className="reflect-title">Reflect</h2>
        <p className="reflect-subtitle">
          Take a moment to write your thoughts and insights for today.
        </p>
      </div>
      <div className="reflect-glass">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={3}
          placeholder="Write your reflection for today..."
          className="reflect-textarea"
        />
        <button
          onClick={handleAdd}
          className="reflect-add-btn"
        >
          Add Reflection
        </button>
        <div className="reflect-entries">
          {reflections.length === 0 ? (
            <p className="reflect-empty">No reflections yet. Start your first one!</p>
          ) : (
            reflections.map((r) => (
              <div key={r.id} className="reflect-entry">
                <div className="reflect-date">{r.date}</div>
                <div className="reflect-text">{r.text}</div>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="reflect-delete-btn"
                  aria-label="Delete reflection"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}