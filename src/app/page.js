'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChessClock from '@/Components/chessClock';
import TimeSelectionModal from '@/Components/TimeSelectionModel';


export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [timeControl, setTimeControl] = useState(null);

  useEffect(() => {
    // Hide the welcome screen after 2 seconds
    const timer = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Show time selection modal after welcome screen fades out
    if (!showWelcome) {
      setShowModal(true);
    }
  }, [showWelcome]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      {/* Welcome Animation */}
      {showWelcome && (
        <motion.div 
          initial={{ opacity: 1 }} 
          animate={{ opacity: 0 }} 
          transition={{ duration: 1 }}
          className="absolute inset-0 flex justify-center items-center bg-black text-white text-4xl font-bold"
        >
          Welcome to Chess Clock
        </motion.div>
      )}

      {/* Time Selection Modal */}
      {showModal && <TimeSelectionModal setTimeControl={setTimeControl} setShowModal={setShowModal} />}
      
      {/* Show Chess Clock after selection */}
      {timeControl && <ChessClock initialTime={timeControl} />}
    </div>
  );
}
