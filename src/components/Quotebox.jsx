import React, { useState, useEffect } from 'react';
import SpotlightCard from './SpotlightCard'; // Add this import

const Quotebox = () => {
  const [quote, setQuote] = useState("Every moment is a fresh beginning. Your SparkWords journey starts now.");
  const [author, setAuthor] = useState("SparkWords");
  const [loading, setLoading] = useState(false);

  const quotes = [
    { content: "Every moment is a fresh beginning. Your SparkWords journey starts now.", author: "SparkWords" },
    { content: "Your limitation—it's only your imagination.", author: "Anonymous" },
    { content: "Push yourself, because no one else is going to do it for you.", author: "Anonymous" },
    { content: "Great things never come from comfort zones.", author: "Anonymous" },
    { content: "Dream it. Wish it. Do it.", author: "Anonymous" },
    { content: "Success doesn't just find you. You have to go out and get it.", author: "Anonymous" },
    { content: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Anonymous" },
    { content: "Don't stop when you're tired. Stop when you're done.", author: "James Bond" },
    { content: "Wake up with determination. Go to bed with satisfaction.", author: "Anonymous" },
    { content: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" },
    { content: "Little things make big days.", author: "Anonymous" },
    { content: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { content: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { content: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
    { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { content: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { content: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { content: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { content: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" }
  ];

  const fetchQuote = async () => {
    setLoading(true);
    
    const availableQuotes = quotes.slice(1);
    const randomQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
    
    setTimeout(() => {
      setQuote(randomQuote.content);
      setAuthor(randomQuote.author);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="quotebox-container">
      <div className="quotebox-header">
        <h1 className="quotebox-title">Spark</h1>
        <p className="quotebox-subtitle">Daily inspiration to ignite your motivation</p>
      </div>

      {/* Replace quote-card div with SpotlightCard */}
      <SpotlightCard 
        className="quote-card-spotlight" 
        spotlightColor="rgba(0, 229, 255, 0.25)"
      >
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p className="loading-text">Finding your spark...</p>
          </div>
        ) : (
          <div className="quote-content">
            <div className="quote-icon">✨</div>
            <blockquote className="quote-text">"{quote}"</blockquote>
            <cite className="quote-author">— {author}</cite>
          </div>
        )}
        
        <button 
          className="new-quote-btn" 
          onClick={fetchQuote}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'New Spark'}
        </button>
      </SpotlightCard>
    </div>
  );
};

export default Quotebox;
