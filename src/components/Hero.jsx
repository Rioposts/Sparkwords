// src/components/Hero.jsx
import React from 'react';
import '../styles/Hero.css'; // We will create this CSS file next

const Hero = () => {
  return (
    <div className="hero-container">
      <h1 className="hero-title glowing-text">Welcome to SparkWords</h1>
      <p className="hero-subtitle">
        Your personal space to reflect, vent, and find inspiration.
      </p>
      <button className="hero-button glowing-button">Get Started</button>
    </div>
  );
};

export default Hero;