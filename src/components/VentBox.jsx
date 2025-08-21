import React, { useState, useEffect } from 'react';
import MoodSelector from './MoodSelector';
import WritingArea from './WritingArea';
import '../styles/VentBox.css';

// Receive the userId prop from App.jsx
const VentBox = ({ userId }) => { 
  const [currentStep, setCurrentStep] = useState('mood');
  const [selectedMood, setSelectedMood] = useState(null);
  const [entries, setEntries] = useState([]);

  // Load entries and persistent state from localStorage on component mount
  useEffect(() => {
    // Wait until the userId is available before trying to load data
    if (!userId) return; 
    
    // Use the userId from props to create user-specific storage keys
    const savedEntriesKey = `ventEntries_${userId}`;
    const savedStepKey = `vent_current_step_${userId}`;
    const savedMoodKey = `vent_selected_mood_${userId}`;

    // Safely load entries
    try {
      const savedEntries = localStorage.getItem(savedEntriesKey);
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
    } catch (e) {
      console.error("Failed to parse vent entries:", e);
      setEntries([]); // Default to empty array on error
    }
    
    // Load persistent state
    const savedStep = localStorage.getItem(savedStepKey);
    const savedMood = localStorage.getItem(savedMoodKey);
    
    if (savedStep && savedStep !== 'mood') {
      setCurrentStep(savedStep);
    }
    if (savedMood) {
      try {
        setSelectedMood(JSON.parse(savedMood));
      } catch (e) {
        console.error('Could not parse saved mood, resetting to null');
      }
    }
    // Add userId to the dependency array, so this runs when the ID is ready
  }, [userId]); 

  // Save persistent state when it changes
  useEffect(() => {
    if (!userId) return;
    localStorage.setItem(`vent_current_step_${userId}`, currentStep);
  }, [currentStep, userId]);

  useEffect(() => {
    if (!userId) return;
    if (selectedMood) {
      localStorage.setItem(`vent_selected_mood_${userId}`, JSON.stringify(selectedMood));
    }
  }, [selectedMood, userId]);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setCurrentStep('writing');
  };

  const handleSaveEntry = (entry) => {
    if (!userId) return;
    const updatedEntries = [entry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem(`ventEntries_${userId}`, JSON.stringify(updatedEntries));
    
    // Clear persistent state after saving
    localStorage.removeItem(`vent_current_step_${userId}`);
    localStorage.removeItem(`vent_selected_mood_${userId}`);
    
    //  im gonna use a modern notification system later
    console.log('Entry saved successfully!'); 
    setCurrentStep('mood');
    setSelectedMood(null);
  };

  const handleChangeMood = () => {
    if (!userId) return;
    localStorage.removeItem(`vent_selected_mood_${userId}`);
    setCurrentStep('mood');
    setSelectedMood(null);
  };

  const handleNewEntry = () => {
    if (!userId) return;
    localStorage.removeItem(`vent_current_step_${userId}`);
    localStorage.removeItem(`vent_selected_mood_${userId}`);
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