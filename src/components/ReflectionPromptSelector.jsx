import React from 'react';
import { FaHandHoldingHeart, FaSeedling, FaRocket, FaBrain, FaPencilAlt } from 'react-icons/fa'; 
import '../styles/ReflectionPromptSelector.css';


const promptCategories = [
  {
    id: 'gratitude',
    title: 'Gratitude',
    description: 'Focus on thankfulness and appreciation.',
    icon: <FaHandHoldingHeart />,
    color: '#34d399', 
  },
  {
    id: 'growth',
    title: 'Growth',
    description: 'Reflect on learning and self-improvement.',
    icon: <FaSeedling />,
    color: '#fbbf24', 
  },
  {
    id: 'ambition',
    title: 'Ambition',
    description: 'Think about your future goals and dreams.',
    icon: <FaRocket />,
    color: '#fb7185', 
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness',
    description: 'Be present and aware of this moment.',
    icon: <FaBrain />,
    color: '#818cf8', 
  },
  {
    id: 'other',
    title: 'Free Write',
    description: 'Write about anything on your mind.',
    icon: <FaPencilAlt />,
    color: '#9ca3af', 
  },
];

const ReflectionPromptSelector = ({ onSelectPrompt }) => {
  return (
    <div className="prompt-selector-container">
      <h3 className="prompt-selector-title">What's on your mind?</h3>
      <div className="prompt-cards-grid">
        {promptCategories.map((category) => (
          <div
            key={category.id}
            className="prompt-card"
            onClick={() => onSelectPrompt(category)}
          
            style={{ '--hover-color': category.color }}
          >
            <div className="prompt-card-icon">{category.icon}</div>
            <h4 className="prompt-card-title">{category.title}</h4>
            <p className="prompt-card-description">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReflectionPromptSelector;