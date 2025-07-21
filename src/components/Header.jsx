import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import { IoSparklesOutline } from "react-icons/io5";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Header = ({ setPage, setShowFeatureSelector }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        
<div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
  <IoSparklesOutline className="logo-icon" />
  <span className="logo-text">SparkWords</span>
</div>

        
       
        <nav className="nav-desktop">
          <a className="nav-link" onClick={() => scrollToSection('features')}>
            Features
          </a>
          <a className="nav-link" onClick={() => scrollToSection('how-it-works')}>
            How It Works
          </a>
          <a className="nav-link" onClick={() => scrollToSection('footer')}>
            About
          </a>
          <button className="cta-button" onClick={() => setShowFeatureSelector(true)}>
           Get Started
          </button>

        </nav>

        
        <button 
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      
      {isMobileMenuOpen && (
        <div className="mobile-nav">
          <a onClick={() => scrollToSection('features')}>Features</a>
          <a onClick={() => scrollToSection('how-it-works')}>How It Works</a>
          <a onClick={() => scrollToSection('footer')}>About</a>
          <button onClick={() => { setPage('spark'); setIsMobileMenuOpen(false); }}>
            Get Started
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
