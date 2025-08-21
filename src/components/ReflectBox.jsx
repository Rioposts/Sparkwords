import React, { useState, useEffect } from "react";
import "../styles/ReflectBox.css";

export default function ReflectBox({ userId }) {
  const [input, setInput] = useState("");
  const [reflections, setReflections] = useState([]);

  // Helper function to normalize reflection entries
  const normalizeReflection = (reflection, index) => {
    // If reflection is already in the new format, return as-is
    if (reflection && typeof reflection === 'object' && reflection.id && reflection.text && reflection.date) {
      return reflection;
    }
    
    // Handle old format - simple string entries
    if (typeof reflection === 'string') {
      return {
        id: Date.now() + index, // Ensure unique ID
        text: reflection,
        date: new Date().toLocaleString()
      };
    }
    
    // Handle partial objects (old format with some properties)
    if (reflection && typeof reflection === 'object') {
      return {
        id: reflection.id || Date.now() + index,
        text: reflection.text || reflection.content || 'No content',
        date: reflection.date || new Date().toLocaleString()
      };
    }
    
    // Fallback for any other format
    return {
      id: Date.now() + index,
      text: 'Invalid reflection format',
      date: new Date().toLocaleString()
    };
  };

  // Load reflections when the component mounts or userId changes
  useEffect(() => {
    if (!userId) return;
    
    const storageKey = `reflections_${userId}`;
    
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsedReflections = JSON.parse(saved);
        // Normalize all reflections to ensure backwards compatibility
        const normalizedReflections = Array.isArray(parsedReflections) 
          ? parsedReflections.map(normalizeReflection)
          : [];
        setReflections(normalizedReflections);
        
        // Save the normalized reflections back to localStorage to prevent future issues
        if (normalizedReflections.length > 0) {
          localStorage.setItem(storageKey, JSON.stringify(normalizedReflections));
        }
      } else {
        setReflections([]);
      }
    } catch (error) {
      console.error("Failed to parse reflections:", error);
      setReflections([]);
      // Clear corrupted data
      localStorage.removeItem(storageKey);
    }
  }, [userId]);

  // Save reflections whenever they change
  useEffect(() => {
    if (!userId) return;
    
    // Only save if there's something to save, to avoid writing empty arrays on first load
    if (reflections && reflections.length > 0) {
      const storageKey = `reflections_${userId}`;
      localStorage.setItem(storageKey, JSON.stringify(reflections));
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
            reflections.map((r) => {
              // Additional safety checks for rendering
              const safeReflection = normalizeReflection(r, 0);
              
              return (
                <div key={safeReflection.id} className="reflect-entry">
                  <div className="reflect-date">{safeReflection.date}</div>
                  <div className="reflect-text">{safeReflection.text}</div>
                  <button
                    onClick={() => handleDelete(safeReflection.id)}
                    className="reflect-delete-btn"
                    aria-label="Delete reflection"
                  >
                    Delete
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}