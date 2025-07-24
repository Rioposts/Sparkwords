import React, { useState } from 'react';
import { IoSparklesOutline, IoJournalOutline, IoSearchOutline, IoMenuOutline, IoClose } from "react-icons/io5";
import '../styles/SidePanel.css';

const SidePanel = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { icon: <IoSparklesOutline />, label: "Spark", page: "spark", color: "#8b5cf6" },
    { icon: <IoJournalOutline />, label: "Vent", page: "vent", color: "#ec4899" },
    { icon: <IoSearchOutline />, label: "Reflect", page: "reflect", color: "#10b981" },
  ];

  const handleNavigation = (page) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Menu Button */}
      <button 
        className="side-panel-trigger"
        onClick={() => setIsOpen(true)}
      >
        <IoMenuOutline />
      </button>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div className="side-panel-overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* Side Panel */}
      <div className={`side-panel ${isOpen ? 'open' : ''}`}>
        <div className="side-panel-header">
          <h3 className="panel-title">Navigate</h3>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <IoClose />
          </button>
        </div>
        
        <nav className="side-panel-nav">
          {items.map((item, index) => (
            <button
              key={item.page}
              className="side-panel-item"
              onClick={() => handleNavigation(item.page)}
              style={{ 
                '--item-color': item.color,
                animationDelay: `${index * 0.1}s`
              }}
            >
              <span className="side-panel-icon">{item.icon}</span>
              <span className="side-panel-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="side-panel-footer">
          <p className="footer-text">Find Your Mental Clarity</p>
        </div>
      </div>
    </>
  );
};

export default SidePanel;
