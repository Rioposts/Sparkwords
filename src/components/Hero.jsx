import React from 'react';
import '../styles/Hero.css';

const Hero = ({ setPage, setShowFeatureSelector }) => {
  const handleGetStarted = () => {
    if (setPage) {
      setPage('spark');
    }
  };

  return (
    <section className="hero">
      <div className="hero__container">
        {/* Animated Background Elements */}
        <div className="hero__decoration">
          {/* Flowing gradient lines */}
          <div className="hero__flow-line hero__flow-line--1"></div>
          <div className="hero__flow-line hero__flow-line--2"></div>
          <div className="hero__flow-line hero__flow-line--3"></div>
          
          {/* Gradient glows */}
          <div className="hero__glow hero__glow--purple"></div>
          <div className="hero__glow hero__glow--cyan"></div>
          <div className="hero__glow hero__glow--pink"></div>
        </div>

        {/* Main content */}
        <div className="hero__content">
          <h1 className="hero__title">
            <span className="hero__title-line">
              <span className="hero__title--gradient-primary">Find your peace</span>
            </span>
            <span className="hero__title-line">
              <span className="hero__title--white"> and Mental wellness,</span>
            </span>
            <span className="hero__title-line">
              <span className="hero__title--gradient-secondary">be a better you.</span>
            </span>
          </h1>
          
          <p className="hero__subtitle">
            Three powerful tools - ready to be integrated into your daily wellness routine
          </p>
          
          <div className="hero__cta">
            <button 
              className="hero__button"
              onClick={() => setShowFeatureSelector(true)}
            >
              <span>Start Your Journey</span>
              <span className="hero__button-arrow">→</span>
            </button>
          </div>
        </div>

        {/* Floating elements for visual appeal */}
        <div className="hero__floating-elements">
          <div className="floating-element floating-element--1"></div>
          <div className="floating-element floating-element--2"></div>
          <div className="floating-element floating-element--3"></div>
          <div className="floating-element floating-element--4"></div>
          <div className="floating-element floating-element--5"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;