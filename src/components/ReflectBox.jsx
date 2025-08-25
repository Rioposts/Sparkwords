import React, { useState, useEffect } from "react";
import ReflectionPromptSelector from './ReflectionPromptSelector'; // Import the new component
import "../styles/ReflectBox.css";

// --- Prompts Data ---
const prompts = {
  gratitude: [
    "What's something small that happened today that you're thankful for?",
    "Who is someone who made your day better recently? Why?",
    "Describe a simple pleasure you enjoyed this week.",
  ],
  growth: [
    "Describe a challenge you faced today and what it taught you.",
    "What is a skill you are currently developing? How is it going?",
    "In what way have you stepped out of your comfort zone recently?",
  ],
  ambition: [
    "What is one step you can take tomorrow to get closer to a long-term goal?",
    "Visualize your ideal future. What does it look and feel like?",
    "What are you most excited to work towards right now?",
  ],
  mindfulness: [
    "Recall a moment today where you felt completely present. What were your senses experiencing?",
    "Describe the feeling of your breath entering and leaving your body.",
    "What is something beautiful you noticed today that you usually overlook?",
  ],
};

const getRandomPrompt = (category) => {
    if (!prompts[category] || prompts[category].length === 0) {
        return "";
    }
    const randomIndex = Math.floor(Math.random() * prompts[category].length);
    return prompts[category][randomIndex];
};


export default function ReflectBox({ userId }) {
  const [input, setInput] = useState("");
  const [reflections, setReflections] = useState([]);
  const [currentStep, setCurrentStep] = useState('list'); 
  const [selectedPrompt, setSelectedPrompt] = useState({
    category: null,
    text: ''
  });

  
  const normalizeReflection = (reflection, index) => {
    if (!reflection) return null;

    if (typeof reflection === 'object' && reflection.id && reflection.text && reflection.date) {
      return reflection;
    }

    return {
      id: reflection.id || Date.now() + index,
      text: reflection.text || String(reflection),
      date: reflection.date || new Date().toLocaleString(),
      
      category: reflection.category || 'other',
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
      category: selectedPrompt.category?.id || 'other' 
    };
    setReflections([newEntry, ...reflections]);
    setInput("");
    setCurrentStep('list');
  };

  const handleDelete = (id) => {
    const updatedReflections = reflections.filter((r) => r.id !== id);
    setReflections(updatedReflections);
    if (updatedReflections.length === 0) {
        localStorage.removeItem(`reflections_${userId}`);
    }
  };

  const handleNewEntryClick = () => {
    setCurrentStep('promptSelection');
  };

  const handleBackClick = () => {
    
    if (currentStep === 'writing') {
        setCurrentStep('promptSelection');
    } else {
        setCurrentStep('list');
    }
  };

  const handlePromptSelect = (category) => {
    if (category.id === 'other') {
        setSelectedPrompt({ category, text: '' });
    } else {
        setSelectedPrompt({ category, text: getRandomPrompt(category.id) });
    }
    setCurrentStep('writing');
  };

  const renderContent = () => {
    switch (currentStep) {
        case 'writing':
            return (
                <div className="reflect-glass writing-view">
                    <button onClick={handleBackClick} className="back-button">
                        &larr; Back to Categories
                    </button>
                    {selectedPrompt.text && (
                        <p className="prompt-text">{selectedPrompt.text}</p>
                    )}
                    <textarea
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        rows={5}
                        placeholder={selectedPrompt.category?.id === 'other' ? "Write about anything..." : "Write your reflection here..."}
                        className="reflect-textarea"
                        autoFocus
                    />
                    <button onClick={handleAdd} className="reflect-add-btn">
                        Add Reflection
                    </button>
                </div>
            );
        case 'promptSelection':
             return (
                <div className="reflect-glass">
                     <button onClick={handleBackClick} className="back-button">
                        &larr; Back to List
                    </button>
                    <ReflectionPromptSelector onSelectPrompt={handlePromptSelect} />
                </div>
             );
        case 'list':
        default:
            return (
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
            );
    }
  };

  return (
    <div className="reflect-container">
      <div className="reflect-header">
        <h2 className="reflect-title">Reflect</h2>
        <p className="reflect-subtitle">
          Take a moment to write your thoughts and insights for today.
        </p>
      </div>
      {renderContent()}
    </div>
  );
}