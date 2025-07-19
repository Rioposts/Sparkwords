import { useState } from "react";
import Home from "./pages/Home";
import QuoteBox from "./components/Quotebox";
import VentBox from "./components/VentBox";
import ReflectBox from "./components/ReflectBox";
import DockNav from "./components/DockNav";
import BackgroundMusic from "./components/BackgroundMusic";
import Particles from "./components/Particles";
import bgMusic from "./assets/chill-bg.mp3";

function App() {
  const [page, setPage] = useState("home"); // default

  const renderPage = () => {
  if (page === "home") return <Home />;
  if (page === "spark") return <QuoteBox />;
  if (page === "vent") return <VentBox />;
  if (page === "reflect") return <ReflectBox />;
};

  return (
    <div className="app">
      <Particles className="particles-bg" /> {/* Add this line for background */}
      <BackgroundMusic src={bgMusic} />
      {renderPage()}
      <DockNav onNavigate={setPage} />
    </div>
  );
}

export default App;
