import React, { useState, useEffect } from 'react';
import MoodSelector from './MoodSelector';
import WritingArea from './WritingArea';
import '../styles/VentBox.css';

const VentBox = ({ userId }) => {
  const [currentStep, setCurrentStep] = useState('mood');
  const [selectedMood, setSelectedMood] = useState(null);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (!userId) return;
    
    const savedEntriesKey = `ventEntries_${userId}`;
    const savedStepKey = `vent_current_step_${userId}`;
    const savedMoodKey = `vent_selected_mood_${userId}`;

    try {
      const savedEntries = localStorage.getItem(savedEntriesKey);
      setEntries(savedEntries ? JSON.parse(savedEntries) : []);
    } catch (e) {
      console.error("Failed to parse vent entries:", e);
      setEntries([]);
    }
    
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
  }, [userId]);

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
    
    localStorage.removeItem(`vent_current_step_${userId}`);
    localStorage.removeItem(`vent_selected_mood_${userId}`);
    
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
              onChangeMood={handleChange.Mood}
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
               
                <span className="entry-mood">
                  {typeof entry.mood === 'object' && entry.mood !== null ? entry.mood.icon : '📝'}
                </span>
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