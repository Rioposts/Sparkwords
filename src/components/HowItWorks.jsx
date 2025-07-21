import React from 'react';

import { useInView } from 'react-intersection-observer';
import '../styles/HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    { number: '01', title: 'Spark Inspiration', description: 'Begin with a dose of curated motivation to set a positive tone for your session.' },
    { number: '02', title: 'Express & Reflect', description: 'Choose a session. Vent your thoughts freely or engage in guided self-reflection.' },
    { number: '03', title: 'Achieve Clarity', description: 'Leave each session feeling lighter, with a clearer and calmer state of mind.' }
  ];

 
  const { ref, inView } = useInView({
    threshold: 0.2, 
    triggerOnce: true,
  });

  return (
  
    <section id="how-it-works" className="how-it-works" ref={ref}>
      <div className="how-it-works__container">
       
        <div className={`how-it-works__header ${inView ? 'how-it-works--visible' : ''}`}>
          <h2 className="how-it-works__title">A Simple Path to a Clearer Mind</h2>
          <p className="how-it-works__subtitle">Just three simple steps to get started on your wellness journey.</p>
        </div>
        <div className="how-it-works__steps">
          {steps.map((step, index) => (
            <div 
              key={index} 
             
              className={`how-it-works__step ${inView ? 'how-it-works--visible' : ''}`} 
              style={{ transitionDelay: `${index * 200}ms` }} 
            >
              <div className="how-it-works__step-number">{step.number}</div>
              <h3 className="how-it-works__step-title">{step.title}</h3>
              <p className="how-it-works__step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;