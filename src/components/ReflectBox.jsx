import React, { useState, useEffect } from "react";
import "../styles/ReflectBox.css";

// Receive the userId prop from App.jsx
export default function ReflectBox({ userId }) {
  const [input, setInput] = useState("");
  const [reflections, setReflections] = useState([]);

  // This useEffect loads reflections when the component mounts or userId changes
  useEffect(() => {
    // Wait until the userId is available
    if (!userId) return;
    
    const storageKey = `reflections_${userId}`;
    
    try {
      const saved = localStorage.getItem(storageKey);
      setReflections(saved ? JSON.parse(saved) : []);
    } catch (error) {
      console.error("Failed to parse reflections:", error);
      setReflections([]); // Default to empty array on error
    }
  }, [userId]); // Add userId to dependency array

  // This useEffect saves reflections whenever they change
  useEffect(() => {
    if (!userId || reflections.length === 0) return;
    
    const storageKey = `reflections_${userId}`;
    localStorage.setItem(storageKey, JSON.stringify(reflections));
  }, [reflections, userId]); // Add userId to dependency array

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