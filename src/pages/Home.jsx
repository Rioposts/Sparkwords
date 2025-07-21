import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks'; 
import Footer from '../components/Footer';
import Particles from '../components/Particles';



const Home = ({ setPage, setShowFeatureSelector }) => { // ONLY ADD setShowFeatureSelector HERE
  return (
    <div className="home-container">
      <Particles/>
      <Header setPage={setPage} setShowFeatureSelector={setShowFeatureSelector} /> {/* ONLY ADD setShowFeatureSelector HERE */}
      <Hero setPage={setPage} setShowFeatureSelector={setShowFeatureSelector} /> {/* ONLY ADD setShowFeatureSelector HERE */}
      <Features />
      <HowItWorks /> 
      <Footer />
    </div>
  );
};


export default Home;
