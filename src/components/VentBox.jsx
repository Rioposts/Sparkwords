import React, { useState, useEffect } from 'react';
import MoodSelector from './MoodSelector';
import WritingArea from './WritingArea';
import '../styles/VentBox.css';

const VentBox = ({ userId }) => {
  const [currentStep, setCurrentStep] = useState('mood');
  const [selectedMood, setSelectedMood] = useState(null);
  const [entries, setEntries] = useState([]);

  // Helper function to safely normalize entries to prevent crashes
  const normalizeEntry = (entry, index) => {
    if (!entry) return null;

    // If entry is already in the correct format
    if (entry && typeof entry === 'object' && entry.id && entry.content && entry.timestamp) {
      return {
        id: entry.id,
        content: String(entry.content || ''),
        mood: entry.mood && typeof entry.mood === 'object' 
          ? {
              id: entry.mood.id || 'unknown',
              name: entry.mood.name || 'Unknown',
              icon: entry.mood.icon || '📝',
              color: entry.mood.color || '#6b7280'
            }
          : { id: 'unknown', name: 'Unknown', icon: '📝', color: '#6b7280' },
        timestamp: entry.timestamp,
        wordCount: entry.wordCount || 0
      };
    }
    
    // Handle old format - simple string entries
    if (typeof entry === 'string') {
      return {
        id: Date.now() + index,
        content: entry,
        mood: { id: 'unknown', name: 'Unknown', icon: '📝', color: '#6b7280' },
        timestamp: new Date().toISOString(),
        wordCount: entry.trim().split(/\s+/).filter(word => word.length > 0).length
      };
    }
    
    // Handle partial objects
    if (entry && typeof entry === 'object') {
      return {
        id: entry.id || Date.now() + index,
        content: String(entry.content || entry.text || 'No content'),
        mood: entry.mood && typeof entry.mood === 'object' 
          ? {
              id: entry.mood.id || 'unknown',
              name: entry.mood.name || 'Unknown',
              icon: entry.mood.icon || '📝',
              color: entry.mood.color || '#6b7280'
            }
          : { id: 'unknown', name: 'Unknown', icon: '📝', color: '#6b7280' },
        timestamp: entry.timestamp || entry.date || new Date().toISOString(),
        wordCount: entry.wordCount || 0
      };
    }
    
    // Fallback
    return null;
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
        if (Array.isArray(parsedEntries)) {
          const normalizedEntries = parsedEntries
            .map(normalizeEntry)
            .filter(entry => entry !== null);
          setEntries(normalizedEntries);
          
          // Save normalized entries back to prevent future issues
          if (normalizedEntries.length > 0) {
            localStorage.setItem(savedEntriesKey, JSON.stringify(normalizedEntries));
          }
        }
      }
    } catch (e) {
      console.error("Failed to parse vent entries:", e);
      setEntries([]);
      localStorage.removeItem(savedEntriesKey);
    }
    
    const savedStep = localStorage.getItem(savedStepKey);
    const savedMood = localStorage.getItem(savedMoodKey);
    
    if (savedStep && savedStep !== 'mood') {
      setCurrentStep(savedStep);
    }
    if (savedMood) {
      try {
        const parsedMood = JSON.parse(savedMood);
        // Ensure the mood object is safe
        if (parsedMood && typeof parsedMood === 'object') {
          setSelectedMood({
            id: parsedMood.id || 'unknown',
            name: parsedMood.name || 'Unknown',
            icon: parsedMood.icon || '📝',
            color: parsedMood.color || '#6b7280'
          });
        }
      } catch (e) {
        console.error('Could not parse saved mood:', e);
        localStorage.removeItem(savedMoodKey);
      }
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    localStorage.setItem(`vent_current_step_${userId}`, currentStep);
  }, [currentStep, userId]);

  useEffect(() => {
    if (!userId || !selectedMood) return;
    localStorage.setItem(`vent_selected_mood_${userId}`, JSON.stringify(selectedMood));
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
    
    // Clean up temporary storage
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
              // Extra safety for rendering
              const safeEntry = normalizeEntry(entry, 0);
              if (!safeEntry) return null;

              return (
                <div key={safeEntry.id} className="entry-preview">
                  <span className="entry-mood">{safeEntry.mood.icon}</span>
                  <span className="entry-date">
                    {new Date(safeEntry.timestamp).toLocaleDateString()}
                  </span>
                  <span className="entry-words">{safeEntry.wordCount} words</span>
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