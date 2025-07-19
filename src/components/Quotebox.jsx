import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

function QuoteBox() {
  const [quote, setQuote] = useState("You’re stronger than your excuses.");
  const [author, setAuthor] = useState("Fawaz Mulla");
  const [loading, setLoading] = useState(false); // No more loading by default

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.quotable.io/random");
      const data = await res.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      setQuote("Could not fetch a new quote. Try again later.");
      setAuthor("SparkWords");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Skip auto-fetch to avoid showing loading screen first
  }, []);

  return (
    <SpotlightCard className="quote-box" spotlightColor="rgba(0, 229, 255, 0.2)">
      <motion.div
        key={quote}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="quote">"{quote}"</p>
        <p className="author">- {author}</p>
      </motion.div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={fetchQuote}
      >
        New Quote
      </motion.button>
    </SpotlightCard>
  );
}

export default QuoteBox;
