import { useState } from "react";
import Home from "./pages/Home";
import QuoteBox from "./components/Quotebox";
import VentBox from "./components/VentBox";
import ReflectBox from "./components/ReflectBox";
import DockNav from "./components/DockNav";
import BackgroundMusic from "./components/BackgroundMusic";
import Particles from "./components/Particles";
import FeatureSelector from "./components/FeatureSelector"; 
import bgMusic from "./assets/chill-bg.mp3";


function App() {
  const [page, setPage] = useState("home");
  const [showFeatureSelector, setShowFeatureSelector] = useState(false); 


  const renderPage = () => {
    if (page === "home") return <Home setPage={setPage} setShowFeatureSelector={setShowFeatureSelector} />; 
    if (page === "spark") return <QuoteBox />;
    if (page === "vent") return <VentBox />;
    if (page === "reflect") return <ReflectBox />;
  };


  return (
    <div className="app">
      {/* to hide particles on the home page */}
      {page !== 'home' && <Particles className="particles-bg" />}
      
      {/* Hiding background music on the home page */}
      {page !== 'home' && <BackgroundMusic src={bgMusic} />}
      
      {renderPage()}
      {page !== 'home' && <DockNav onNavigate={setPage} />}
      
      <FeatureSelector 
        isOpen={showFeatureSelector}
        onClose={() => setShowFeatureSelector(false)}
        setPage={setPage}
      /> 
    </div>
  );
}


export default App;
