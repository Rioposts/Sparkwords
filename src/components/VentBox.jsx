import React, { useState, useEffect } from 'react';
import MoodSelector from './MoodSelector';
import WritingArea from './WritingArea';
import '../styles/VentBox.css';

const VentBox = ({ userId }) => {
  const [currentStep, setCurrentStep] = useState('mood');
  const [selectedMood, setSelectedMood] = useState(null);
  const [entries, setEntries] = useState([]);

  // Helper function to normalize entries to the new format
  const normalizeEntry = (entry, index) => {
    // If entry is already in the new format, return as-is
    if (entry && typeof entry === 'object' && entry.id && entry.content && entry.mood && entry.timestamp) {
      return entry;
    }
    
    // Handle old format - simple string entries
    if (typeof entry === 'string') {
      return {
        id: Date.now() + index, // Ensure unique ID
        content: entry,
        mood: { icon: '📝', name: 'Unknown', id: 'unknown' }, // Default mood
        timestamp: new Date().toISOString(),
        wordCount: entry.trim().split(/\s+/).filter(word => word.length > 0).length
      };
    }
    
    // Handle partial objects (old format with some properties)
    if (entry && typeof entry === 'object') {
      return {
        id: entry.id || Date.now() + index,
        content: entry.content || entry.text || 'No content',
        mood: entry.mood && typeof entry.mood === 'object' 
          ? entry.mood 
          : { icon: '📝', name: 'Unknown', id: 'unknown' },
        timestamp: entry.timestamp || entry.date || new Date().toISOString(),
        wordCount: entry.wordCount || (entry.content || entry.text || '').trim().split(/\s+/).filter(word => word.length > 0).length
      };
    }
    
    // Fallback for any other format
    return {
      id: Date.now() + index,
      content: 'Invalid entry format',
      mood: { icon: '📝', name: 'Unknown', id: 'unknown' },
      timestamp: new Date().toISOString(),
      wordCount: 0
    };
  };

  useEffect(() => {
    if (!userId) return;
    
    const savedEntriesKey = `ventEntries_${userId}`;
    const savedStepKey = `vent_current_step_${userId}`;
    const savedMoodKey = `vent_selected_mood_${userId}`;

    try {
      const savedEntries = localStorage.getItem(savedEntriesKey);
      if (savedEntries) {
        const parsedEntries = JSON.parse(savedEntries);
        // Normalize all entries to ensure backwards compatibility
        const normalizedEntries = Array.isArray(parsedEntries) 
          ? parsedEntries.map(normalizeEntry)
          : [];
        setEntries(normalizedEntries);
        
        // Save the normalized entries back to localStorage to prevent future issues
        if (normalizedEntries.length > 0) {
          localStorage.setItem(savedEntriesKey, JSON.stringify(normalizedEntries));
        }
      } else {
        setEntries([]);
      }
    } catch (e) {
      console.error("Failed to parse vent entries:", e);
      setEntries([]);
      // Clear corrupted data
      localStorage.removeItem(savedEntriesKey);
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
        localStorage.removeItem(savedMoodKey);
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
            {entries.slice(0, 3).map((entry) => {
              // Additional safety check for rendering
              const safeMood = entry.mood && typeof entry.mood === 'object' 
                ? entry.mood 
                : { icon: '📝', name: 'Unknown' };
              
              const safeTimestamp = entry.timestamp || new Date().toISOString();
              const safeWordCount = entry.wordCount || 0;

              return (
                <div key={entry.id} className="entry-preview">
                  <span className="entry-mood">{safeMood.icon}</span>
                  <span className="entry-date">
                    {new Date(safeTimestamp).toLocaleDateString()}
                  </span>
                  <span className="entry-words">{safeWordCount} words</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default VentBox;