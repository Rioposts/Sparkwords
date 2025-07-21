import React from 'react';
import { useInView } from 'react-intersection-observer';
import '../styles/Footer.css';
import {FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { HiMail } from "react-icons/hi";
import { IoSparklesOutline } from "react-icons/io5";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Scroll animation hooks
  const { ref: contentRef, inView: contentInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const { ref: bottomRef, inView: bottomInView } = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  const socialLinks = [
  { 
    name: 'Email', 
    icon: <HiMail />, 
    url: 'mailto:mullafawaz@gmail.com',
    color: '#ea4335' // Gmail red
  },
  { 
    name: 'LinkedIn', 
    icon: <FaLinkedinIn />, 
    url: 'https://www.linkedin.com/in/fawaz-mulla-731872336/',
    color: '#0077b5'
  },
  { 
    name: 'GitHub', 
    icon: <FaGithub />, 
    url: 'https://github.com/Rioposts',
    color: '#6cc644'
  }
];


 

  return (
    <footer id="footer" className="footer">
      {/* Glassmorphism container */}
      <div className="footer__container">
        
        {/* Main footer content with scroll animation */}
        <div 
          ref={contentRef}
          className={`footer__content ${contentInView ? 'footer__content--animate' : ''}`}
        >
          {/* Brand section */}
          <div className="footer__brand">
            <div className="footer__logo">
              <IoSparklesOutline className="footer__logo-icon" />
              SparkWords
            </div>
            <p className="footer__description">
              Your personal space for mental clarity and emotional wellness. 
              Find inspiration, release thoughts, and reflect on your journey 
              towards better mental health.
            </p>
          </div>

          

          {/* Social Links */}
          <div className="footer__section">
            <h4 className="footer__social-title">Connect With Us</h4>
            <div className="footer__social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="footer__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-color={social.color}
                  style={{ animationDelay: `${index * 0.15}s` }}
                  aria-label={social.name}
                >
                  <span className="footer__social-icon">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

       
        <div className={`footer__divider ${contentInView ? 'footer__divider--animate' : ''}`}></div>

      
        <div 
          ref={bottomRef}
          className={`footer__bottom-content ${bottomInView ? 'footer__bottom-content--animate' : ''}`}
        >
          <p className="footer__copyright">
            © {currentYear} SparkWords. All rights reserved.
          </p>
          <p className="footer__tagline">
            "Clarity begins with a single spark." ✨
          </p>
        </div>
      </div>

     
      <div className="footer__decoration">
        <div className="footer__glow footer__glow--left"></div>
        <div className="footer__glow footer__glow--right"></div>
      </div>
    </footer>
  );
};

export default Footer;
