import React, { useState, useEffect } from 'react';
import MoodSelector from './MoodSelector';
import WritingArea from './WritingArea';
import '../styles/VentBox.css';

const VentBox = () => {
  const [currentStep, setCurrentStep] = useState('mood');
  const [selectedMood, setSelectedMood] = useState(null);
  const [entries, setEntries] = useState([]);

  // Generate unique user ID for privacy
  const getUserId = () => {
    let userId = localStorage.getItem('sparkwords_user_id');
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('sparkwords_user_id', userId);
    }
    return userId;
  };

  // Load entries and persistent state from localStorage on component mount
  useEffect(() => {
    const userId = getUserId();
    
    // Load entries
    const savedEntries = localStorage.getItem(`ventEntries_${userId}`);
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
    
    // Load persistent state
    const savedStep = localStorage.getItem(`vent_current_step_${userId}`);
    const savedMood = localStorage.getItem(`vent_selected_mood_${userId}`);
    
    if (savedStep && savedStep !== 'mood') {
      setCurrentStep(savedStep);
    }
    if (savedMood) {
      try {
        setSelectedMood(JSON.parse(savedMood));
      } catch (e) {
        console.log('Could not parse saved mood, resetting to null');
      }
    }
  }, []);

  // Save persistent state when it changes
  useEffect(() => {
    const userId = getUserId();
    localStorage.setItem(`vent_current_step_${userId}`, currentStep);
  }, [currentStep]);

  useEffect(() => {
    const userId = getUserId();
    if (selectedMood) {
      localStorage.setItem(`vent_selected_mood_${userId}`, JSON.stringify(selectedMood));
    }
  }, [selectedMood]);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setCurrentStep('writing');
  };

  const handleSaveEntry = (entry) => {
    const userId = getUserId();
    const updatedEntries = [entry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem(`ventEntries_${userId}`, JSON.stringify(updatedEntries));
    
    // Clear persistent state after saving
    localStorage.removeItem(`vent_current_step_${userId}`);
    localStorage.removeItem(`vent_selected_mood_${userId}`);
    
    alert('Entry saved successfully!');
    setCurrentStep('mood');
    setSelectedMood(null);
  };

  const handleChangeMood = () => {
    const userId = getUserId();
    // Clear the persistent mood but keep the step change
    localStorage.removeItem(`vent_selected_mood_${userId}`);
    setCurrentStep('mood');
    setSelectedMood(null);
  };

  const handleNewEntry = () => {
    const userId = getUserId();
    // Clear all persistent state when starting fresh
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
