import React, { useState, useEffect } from 'react';
import '../styles/WritingArea.css';

const WritingArea = ({ selectedMood, onSaveEntry, onChangeMood }) => {
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);

  // better prompts for more comforing space for the user 
  const prompts = {
    happy: "That's wonderful! What's bringing you joy today?",
    sad: "It's okay to feel this way. Take your time and write what's on your mind.",
    anxious: "Let's work through this. What thoughts are causing you anxiety right now?",
    angry: "This is a safe space to let it out. What's frustrating you?",
    stressed: "Feeling overwhelmed is tough. What's contributing to your stress today?",
    peaceful: "Embrace this calm. What are you feeling grateful for in this moment?"
  };

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  const handleSave = () => {
    if (content.trim().length > 0) {
      const entry = {
        id: Date.now(),
        content: content.trim(),
        mood: selectedMood,
        timestamp: new Date().toISOString(),
        wordCount: wordCount
      };
      onSaveEntry(entry);
      setContent('');
    }
  };

  return (
    <div className="writing-area">
      <div className="writing-header">
        <div className="mood-indicator">
          <span className="current-mood">{selectedMood.icon} {selectedMood.name}</span>
          <span className="word-count">{wordCount} words</span>
        </div>
      </div>
      
      <textarea
        className="writing-textarea"
        placeholder={prompts[selectedMood.id] || "Start writing your thoughts..."}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={15}
      />
      
      <div className="writing-actions">
        <button className="back-button" onClick={onChangeMood}>
          ← Change Mood
        </button>
        
        <button 
          className="save-button"
          onClick={handleSave}
          disabled={content.trim().length === 0}
        >
          Save Entry
        </button>
      </div>
    </div>
  );
};

export default WritingArea;