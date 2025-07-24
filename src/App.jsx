import { useState } from "react";
import Home from "./pages/Home";
import QuoteBox from "./components/Quotebox";
import VentBox from "./components/VentBox";
import ReflectBox from "./components/ReflectBox";
import SidePanel from "./components/SidePanel"; // CHANGE THIS LINE
import BackgroundMusic from "./components/BackgroundMusic";
import Particles from "./components/Particles";
import FeatureSelector from "./components/FeatureSelector";
import bgMusic from "./assets/chill-bg.mp3";

function App() {
  const [page, setPage] = useState("home");
  const [showFeatureSelector, setShowFeatureSelector] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    if (page === "vent") return <VentBox />;
    if (page === "reflect") return <ReflectBox />;
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
      
      {page !== 'home' && <SidePanel onNavigate={handlePageChange} />} {/* CHANGE THIS LINE */}
      
      <FeatureSelector 
        isOpen={showFeatureSelector}
        onClose={() => setShowFeatureSelector(false)}
        setPage={handlePageChange}
      />

      {/* Keep your loading transitions */}
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
