import React from 'react';
import { 
  HiOutlineFaceSmile, 
  HiOutlineFaceFrown,
  HiOutlineExclamationTriangle,
  HiOutlineFire,
  HiOutlineBolt,
  HiOutlineHeart
} from 'react-icons/hi2';
import '../styles/MoodSelector.css';

const MoodSelector = ({ selectedMood, onMoodSelect }) => {
  const moods = [
    { 
      id: 'happy', 
      name: 'Happy', 
      icon: <HiOutlineFaceSmile />, 
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.4)'
    },
    { 
      id: 'sad', 
      name: 'Sad', 
      icon: <HiOutlineFaceFrown />, 
      color: '#3b82f6',
      glowColor: 'rgba(59, 130, 246, 0.4)'
    },
    { 
      id: 'anxious', 
      name: 'Anxious', 
      icon: <HiOutlineExclamationTriangle />, 
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.4)'
    },
    { 
      id: 'angry', 
      name: 'Angry', 
      icon: <HiOutlineFire />, 
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.4)'
    },
    { 
      id: 'stressed', 
      name: 'Stressed', 
      icon: <HiOutlineBolt />, 
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.4)'
    },
    { 
      id: 'peaceful', 
      name: 'Peaceful', 
      icon: <HiOutlineHeart />, 
      color: '#06b6d4',
      glowColor: 'rgba(6, 182, 212, 0.4)'
    }
  ];

  return (
    <div className="mood-selector">
      <h3 className="mood-title">How are you feeling right now?</h3>
      <div className="mood-grid">
        {moods.map((mood) => (
          <button
            key={mood.id}
            className={`mood-button ${selectedMood?.id === mood.id ? 'selected' : ''}`}
            onClick={() => onMoodSelect(mood)}
            style={{ 
              '--mood-color': mood.color,
              '--mood-glow': mood.glowColor
            }}
          >
            <span className="mood-icon">{mood.icon}</span>
            <span className="mood-name">{mood.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
