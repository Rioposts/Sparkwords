import React from 'react';
import { useInView } from 'react-intersection-observer';
import '../styles/Features.css';
import { IoSparklesOutline } from "react-icons/io5";
import { RiBubbleChartLine } from "react-icons/ri";
import { FaBrain } from "react-icons/fa";

const Features = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const { ref: card1Ref, inView: card1InView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
    delay: 100
  });

  const { ref: card2Ref, inView: card2InView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
    delay: 200
  });

  const { ref: card3Ref, inView: card3InView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
    delay: 300
  });

  const features = [
    {
      title: "Spark",
      description: "Discover daily motivation through carefully curated inspirational quotes that ignite your inner drive and spark positive thinking.",
      icon: <IoSparklesOutline />,
      gradient: "from-yellow-400 to-orange-500",
      glowColor: "rgba(251, 191, 36, 0.15)",
      shadowColor: "rgba(251, 191, 36, 0.3)"
    },
    {
      title: "Vent",
      description: "Release your thoughts and emotions in a safe, private space designed for authentic self-expression and mental clarity.",
      icon: <RiBubbleChartLine />,
      gradient: "from-purple-500 to-pink-500",
      glowColor: "rgba(168, 85, 247, 0.15)",
      shadowColor: "rgba(168, 85, 247, 0.3)"
    },
    {
      title: "Reflect",
      description: "Engage in guided self-reflection sessions that help you gain deeper insights into your thoughts, feelings, and personal growth.",
      icon: <FaBrain />,
      gradient: "from-cyan-400 to-blue-500",
      glowColor: "rgba(6, 182, 212, 0.15)",
      shadowColor: "rgba(6, 182, 212, 0.3)"
    }
  ];

  return (
    <section id="features" className="features" ref={sectionRef}>
      <div className="features__container">
        {/* Background decoration */}
        <div className="features__background">
          <div className="features__bg-glow features__bg-glow--left"></div>
          <div className="features__bg-glow features__bg-glow--right"></div>
        </div>

        {/* Section header */}
        <div className={`features__header ${sectionInView ? 'features__header--visible' : ''}`}>
          <h2 className="features__title">
            Powerful Tools for Your{' '}
            <span className="features__title--highlight">Mental Wellness</span>
          </h2>
          <p className="features__subtitle">
            Three essential features designed to support your mental health journey
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="features__grid">
          {features.map((feature, index) => {
            let cardInView = false;
            let cardRef = null;
            
            if (index === 0) {
              cardInView = card1InView;
              cardRef = card1Ref;
            } else if (index === 1) {
              cardInView = card2InView;
              cardRef = card2Ref;
            } else {
              cardInView = card3InView;
              cardRef = card3Ref;
            }

            return (
              <div
                key={feature.title}
                ref={cardRef}
                className={`features__card ${cardInView ? 'features__card--visible' : ''}`}
                style={{
                  '--glow-color': feature.glowColor,
                  '--shadow-color': feature.shadowColor,
                  '--gradient': `linear-gradient(135deg, ${feature.gradient.replace('from-', '').replace(' to-', ', ')})`,
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* Card glow effect */}
                <div className="features__card-glow"></div>
                
                {/* Card background with glassmorphism */}
                <div className="features__card-background"></div>
                
                <div className="features__card-content">
                  <div className="features__card-icon">
                    {feature.icon}
                  </div>
                  
                  <h3 className="features__card-title">
                    {feature.title}
                  </h3>
                  
                  <p className="features__card-description">
                    {feature.description}
                  </p>
                </div>

                {/* Hover overlay */}
                <div className="features__card-overlay"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;