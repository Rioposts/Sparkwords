import React, { useState, useEffect } from "react";
import "../styles/ReflectBox.css";

export default function ReflectBox({ userId }) {
  const [input, setInput] = useState("");
  const [reflections, setReflections] = useState([]);
  const [currentStep, setCurrentStep] = useState('list'); // 'list' or 'writing'

  // --- THE PERMANENT FIX: A Robust Normalizer Function ---
  const normalizeReflection = (reflection, index) => {
    if (!reflection) return null;

    if (typeof reflection === 'object' && reflection.id && reflection.text && reflection.date) {
      return reflection;
    }

    return {
      id: reflection.id || Date.now() + index,
      text: reflection.text || String(reflection),
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
    if (!userId) return;
    // Do not save an empty array on initial load if there's nothing there.
    if (reflections.length > 0) {
        localStorage.setItem(`reflections_${userId}`, JSON.stringify(reflections));
    }
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
    setCurrentStep('list'); // Go back to the list after adding
  };

  const handleDelete = (id) => {
    const updatedReflections = reflections.filter((r) => r.id !== id);
    setReflections(updatedReflections);
    // If all reflections are deleted, remove the item from local storage
    if (updatedReflections.length === 0) {
        localStorage.removeItem(`reflections_${userId}`);
    }
  };

  const handleNewEntryClick = () => {
    setCurrentStep('writing');
  };

  const handleBackClick = () => {
    setCurrentStep('list');
  };


  return (
    <div className="reflect-container">
      <div className="reflect-header">
        <h2 className="reflect-title">Reflect</h2>
        <p className="reflect-subtitle">
          Take a moment to write your thoughts and insights for today.
        </p>
      </div>

      {currentStep === 'writing' ? (
         <div className="reflect-glass writing-view">
            <button onClick={handleBackClick} className="back-button">
                &larr; Back to Reflections
            </button>
            <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                rows={4}
                placeholder="Write your reflection for today..."
                className="reflect-textarea"
                autoFocus
            />
            <button
                onClick={handleAdd}
                className="reflect-add-btn"
            >
                Add Reflection
            </button>
         </div>
      ) : (
        <div className="reflect-glass list-view">
            <div className="entries-header">
                <h3>Your Recent Reflections</h3>
                <button className="new-entry-btn" onClick={handleNewEntryClick}>
                    + New Reflection
                </button>
            </div>
            <div className="reflect-entries">
            {reflections.length > 0 ? reflections.map((r) => (
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
            )) : (
                <p className="reflect-empty">You have no reflections yet.</p>
            )}
            </div>
        </div>
      )}
    </div>
  );
}