import { useState, useEffect } from "react";
import Home from "./pages/Home";
import QuoteBox from "./components/Quotebox";
import VentBox from "./components/VentBox";
import ReflectBox from "./components/ReflectBox";
import SidePanel from "./components/SidePanel";
import BackgroundMusic from "./components/BackgroundMusic";
import Particles from "./components/Particles";
import FeatureSelector from "./components/FeatureSelector";
import bgMusic from "./assets/chill-bg.mp3";

function App() {
  const [page, setPage] = useState("home");
  const [showFeatureSelector, setShowFeatureSelector] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // State to hold the unique user ID 
  const [userId, setUserId] = useState(null);

  // useEffect to create and manage the user ID 
  useEffect(() => {
    let currentUserId = localStorage.getItem('sparkwordsUserId');
    if (!currentUserId) {
      // If no ID exists, create a new unique one and store it
      currentUserId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('sparkwordsUserId', currentUserId);
    }
    setUserId(currentUserId);
  }, []); // The empty array [] means this effect runs only once when the app first loads

  const handlePageChange = (newPage) => {
    if (newPage === page) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setPage(newPage);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 300);
  };

  const renderPage = () => {
    if (page === "home") return <Home setPage={handlePageChange} setShowFeatureSelector={setShowFeatureSelector} />;
    if (page === "spark") return <QuoteBox />;
    
    // Pass the userId to VentBox and ReflectBox
    if (page === "vent") return <VentBox userId={userId} />;
    if (page === "reflect") return <ReflectBox userId={userId} />;
  };

  const getPageDisplayName = (pageName) => {
    const names = {
      'spark': 'Spark',
      'vent': 'Vent', 
      'reflect': 'Reflect',
      'home': 'Home'
    };
    return names[pageName] || pageName;
  };

  return (
    <div className="app">
      {page !== 'home' && <Particles className="particles-bg" />}
      {page !== 'home' && <BackgroundMusic src={bgMusic} />}
      
      {renderPage()}
      
      {/*  The SidePanel here is for navigation */}
      {page !== 'home' && <SidePanel onNavigate={handlePageChange} />}
      
      <FeatureSelector 
        isOpen={showFeatureSelector}
        onClose={() => setShowFeatureSelector(false)}
        setPage={handlePageChange}
      />

      {isTransitioning && (
        <div className="page-transition-overlay">
          <div className="transition-content">
            <div className="transition-spinner"></div>
            <p className="transition-text">Loading {getPageDisplayName(page)}...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;