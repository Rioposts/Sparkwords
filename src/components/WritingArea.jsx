import React, { useState, useEffect } from 'react';
import '../styles/WritingArea.css';

const WritingArea = ({ selectedMood, onSaveEntry, onChangeMood }) => {
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const prompts = {
    happy: "What brought joy to your day? Share what's making you smile...",
    sad: "It's okay to feel sad. What's on your heart right now?",
    anxious: "Take a deep breath. What thoughts are racing through your mind?",
    angry: "Let it out safely here. What's frustrating you today?",
    stressed: "You're in a safe space. What's overwhelming you right now?",
    peaceful: "Enjoy this calm moment. What are you grateful for today?"
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
