import React, { useState } from 'react';
import { IoSparklesOutline, IoJournalOutline, IoSearchOutline } from "react-icons/io5";
import '../styles/FeatureSelector.css';

const FeatureSelector = ({ isOpen, onClose, setPage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('');

  const features = [
    {
      id: 'spark',
      name: 'Spark',
      icon: <IoSparklesOutline />,
      description: 'Daily inspiration to ignite your motivation',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)'
    },
    {
      id: 'vent',
      name: 'Vent',
      icon: <IoJournalOutline />,
      description: 'A private space to release your thoughts',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)'
    },
    {
      id: 'reflect',
      name: 'Reflect',
      icon: <IoSearchOutline />,
      description: 'Guided sessions for deeper self-awareness',
      gradient: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)'
    }
  ];

  const handleFeatureSelect = (featureId) => {
    setSelectedFeature(featureId);
    setIsLoading(true);
    
    // Simulate loading and transition
    setTimeout(() => {
      setPage(featureId);
      setIsLoading(false);
      onClose();
    }, 3000); 
  };

  if (!isOpen) return null;

  if (isLoading) {
    return <LoadingScreen selectedFeature={selectedFeature} features={features} />;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Choose Your Journey</h2>
          <p className="modal-subtitle">Select how you'd like to begin your wellness experience</p>
        </div>
        
        <div className="feature-cards">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className="feature-card"
              style={{ animationDelay: `${index * 0.15}s` }}
              onClick={() => handleFeatureSelect(feature.id)}
            >
              <div className="card-icon" style={{ background: feature.gradient }}>
                {feature.icon}
              </div>
              <h3 className="card-title">{feature.name}</h3>
              <p className="card-description">{feature.description}</p>
              <div className="card-glow" style={{ background: feature.gradient }}></div>
            </div>
          ))}
        </div>
        
        <button className="modal-close" onClick={onClose}>
          Maybe Later
        </button>
      </div>
    </div>
  );
};

const LoadingScreen = ({ selectedFeature, features }) => {
  const currentFeature = features.find(f => f.id === selectedFeature);
  
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-icon-wrapper">
          <div className="loading-icon" style={{ background: currentFeature?.gradient }}>
            {currentFeature?.icon}
          </div>
          <div className="loading-ring"></div>
        </div>
        <h3 className="loading-text">Preparing your {currentFeature?.name} experience...</h3>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default FeatureSelector;
