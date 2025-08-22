import React, { useState, useEffect } from 'react';
import MoodSelector from './MoodSelector';
import WritingArea from './WritingArea';
import '../styles/VentBox.css';

const VentBox = ({ userId }) => {
  const [currentStep, setCurrentStep] = useState('mood');
  const [selectedMood, setSelectedMood] = useState(null);
  const [entries, setEntries] = useState([]);

  // --- THE PERMANENT FIX: A Robust Normalizer Function ---
  // This function takes any entry and safely converts it to the latest format.
  const normalizeEntry = (entry, index) => {
    if (!entry) return null; // Ignore null/undefined entries

    // If it's already a modern entry, just return it.
    if (entry && typeof entry === 'object' && entry.id && entry.content && entry.mood) {
      return entry;
    }
    
    // This handles old entries that might be just strings or simple objects
    return {
      id: entry.id || Date.now() + index,
      content: entry.content || entry.text || String(entry), // Safely gets the text
      mood: { id: 'unknown', name: 'Legacy', icon: '📝', color: '#6b7280' }, // Provides a default mood
      timestamp: entry.timestamp || new Date().toISOString(),
      wordCount: entry.wordCount || (entry.content || entry.text || String(entry)).trim().split(/\s+/).length
    };
  };

  useEffect(() => {
    if (!userId) return;
    
    const savedEntriesKey = `ventEntries_${userId}`;
    
    try {
      const saved = localStorage.getItem(savedEntriesKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Normalize every entry to prevent crashes from old data formats
        const normalizedEntries = Array.isArray(parsed) ? parsed.map(normalizeEntry).filter(Boolean) : [];
        setEntries(normalizedEntries);
      }
    } catch (e) {
      console.error("Failed to parse vent entries, clearing corrupted data.", e);
      localStorage.removeItem(savedEntriesKey); // Clear corrupted data
      setEntries([]);
    }
    
    // ... rest of your useEffect for loading step/mood remains the same
    const savedStepKey = `vent_current_step_${userId}`;
    const savedMoodKey = `vent_selected_mood_${userId}`;
    const savedStep = localStorage.getItem(savedStepKey);
    const savedMood = localStorage.getItem(savedMoodKey);
    if (savedStep && savedStep !== 'mood') setCurrentStep(savedStep);
    if (savedMood) try { setSelectedMood(JSON.parse(savedMood)); } catch {}

  }, [userId]);

  // The rest of your component's logic remains the same.
  // I am including it here for you to copy-paste the entire file easily.

  useEffect(() => {
    if (!userId) return;
    localStorage.setItem(`vent_current_step_${userId}`, currentStep);
    if (selectedMood) {
      localStorage.setItem(`vent_selected_mood_${userId}`, JSON.stringify(selectedMood));
    }
  }, [currentStep, selectedMood, userId]);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setCurrentStep('writing');
  };

  const handleSaveEntry = (entry) => {
    if (!userId) return;
    const updatedEntries = [entry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem(`ventEntries_${userId}`, JSON.stringify(updatedEntries));
    
    localStorage.removeItem(`vent_current_step_${userId}`);
    localStorage.removeItem(`vent_selected_mood_${userId}`);
    
    setCurrentStep('mood');
    setSelectedMood(null);
  };

  const handleChangeMood = () => {
    setCurrentStep('mood');
  };

  const handleNewEntry = () => {
    setCurrentStep('mood');
    setSelectedMood(null);
  };

  return (
    <div className="vent-container">
      <div className="vent-header">
        <h1 className="vent-title">Vent</h1>
        <p className="vent-subtitle">Your private space to release and reflect</p>
      </div>

      <div className="vent-content">
        {currentStep === 'mood' ? (
          <MoodSelector 
            selectedMood={selectedMood}
            onMoodSelect={handleMoodSelect}
          />
        ) : (
          <div className="writing-session">
            <WritingArea 
              selectedMood={selectedMood}
              onSaveEntry={handleSaveEntry}
              onChangeMood={handleChangeMood}
            />
          </div>
        )}
      </div>

      {entries.length > 0 && currentStep === 'mood' && (
        <div className="recent-entries">
          <div className="entries-header">
            <h3>Your Recent Thoughts</h3>
            <button className="new-entry-btn" onClick={handleNewEntry}>
              + New Entry
            </button>
          </div>
          <div className="entries-preview">
            {entries.slice(0, 3).map((entry) => (
              <div key={entry.id} className="entry-preview">
                <span className="entry-mood">{entry.mood.icon}</span>
                <span className="entry-date">
                  {new Date(entry.timestamp).toLocaleDateString()}
                </span>
                <span className="entry-words">{entry.wordCount} words</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VentBox;