import React, { useState, useEffect } from "react";
import "../styles/ReflectBox.css";

export default function ReflectBox({ userId }) {
  const [input, setInput] = useState("");
  const [reflections, setReflections] = useState([]);

  // --- THE PERMANENT FIX: A Robust Normalizer Function ---
  const normalizeReflection = (reflection, index) => {
    if (!reflection) return null;

    // If it's already a modern entry object
    if (typeof reflection === 'object' && reflection.id && reflection.text && reflection.date) {
      return reflection;
    }

    // This handles old entries that might be just strings
    return {
      id: reflection.id || Date.now() + index,
      text: reflection.text || String(reflection), // Safely get the text
      date: reflection.date || new Date().toLocaleString(),
    };
  };

  useEffect(() => {
    if (!userId) return;
    
    const storageKey = `reflections_${userId}`;
    
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Normalize every reflection to handle old data formats
        const normalizedReflections = Array.isArray(parsed) ? parsed.map(normalizeReflection).filter(Boolean) : [];
        setReflections(normalizedReflections);
      }
    } catch (error) {
      console.error("Failed to parse reflections, clearing corrupted data.", error);
      localStorage.removeItem(storageKey);
      setReflections([]);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId || reflections.length === 0) return;
    localStorage.setItem(`reflections_${userId}`, JSON.stringify(reflections));
  }, [reflections, userId]);

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
          {reflections.length > 0 && reflections.map((r) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}