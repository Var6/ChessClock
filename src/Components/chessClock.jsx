'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/utils/utils';
import TimeSelectionModal from './TimeSelectionModel';


const ChessClock = ({ initialTime }) => {
  const incrementTime = 1; // 1 second increment per move

  const [playerOneTime, setPlayerOneTime] = useState(initialTime);
  const [playerTwoTime, setPlayerTwoTime] = useState(initialTime);
  const [timerRunning, setTimerRunning] = useState(null); // 'playerOne', 'playerTwo', or null
  const [paused, setPaused] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const isLowTime = (time) => time < 10;

  useEffect(() => {
    let interval;
    if (timerRunning && !paused) {
      interval = setInterval(() => {
        if (timerRunning === 'playerOne') {
          setPlayerOneTime((prev) => Math.max(prev - 1, 0));
        } else if (timerRunning === 'playerTwo') {
          setPlayerTwoTime((prev) => Math.max(prev - 1, 0));
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning, paused]);

  const handleStartStop = (player) => {
    if (!timerRunning && player === 'playerOne') {
      setTimerRunning('playerOne'); // White moves first
      return;
    }
    if (timerRunning === player) {
      if (player === 'playerOne') {
        setPlayerOneTime((prev) => Math.min(prev + incrementTime, initialTime));
      } else {
        setPlayerTwoTime((prev) => Math.min(prev + incrementTime, initialTime));
      }
      setTimerRunning(player === 'playerOne' ? 'playerTwo' : 'playerOne');
    }
  };

  const handlePause = () => {
    setPaused((prev) => !prev);
  };

  const handleReset = () => {
    setPlayerOneTime(initialTime);
    setPlayerTwoTime(initialTime);
    setTimerRunning(null);
    setPaused(false);
  };

  return (
    <div className="flex flex-col items-center w-full h-screen p-4">
      <div className="flex flex-col md:flex-row w-full h-full items-center justify-center border border-3 border-green-700 md:space-x-7">
        <div
          onClick={() => timerRunning !== 'playerTwo' && handleStartStop('playerOne')}
          className={`flex-col w-full md:w-1/4 p-6 text-2xl font-bold rounded-lg border border-3 border-green-700 cursor-pointer flex items-center h-1/2 justify-center ${timerRunning === 'playerOne' ? 'bg-blue-500' : 'bg-gray-300'} ${isLowTime(playerOneTime) ? 'bg-red-700 animate-pulse' : ''}`}
        >
          <div className=" text-xl text-black">White</div>
          {formatTime(playerOneTime)}
        </div>
        <div className="flex space-x-4 my-4 md:my-0 md:flex-col md:space-y-4">
          {timerRunning && (
            <button onClick={handlePause} className="p-2 bg-yellow-500 text-white rounded">
              {paused ? 'Resume' : 'Pause'}
            </button>
          )}
          {!timerRunning && (
            <button onClick={() => setShowModal(true)} className="p-2 bg-blue-600 text-white rounded">
              Change Time Control
            </button>
          )}
          <button onClick={handleReset} className="p-2 mx-auto bg-red-500 text-white rounded">
            Resets
          </button>
        </div>
        <div
          onClick={() => timerRunning !== 'playerOne' && handleStartStop('playerTwo')}
          className={`w-full flex-col h-1/2 md:w-1/2 max-w-md p-6 text-2xl font-bold rounded-lg cursor-pointer flex items-center justify-center ${timerRunning === 'playerTwo' ? 'bg-blue-500' : 'bg-gray-300'} ${isLowTime(playerTwoTime) ? 'bg-red-700 animate-pulse' : ''}`}
        >
          <div className=" text-xl text-black">Black</div>
          {formatTime(playerTwoTime)}
        </div>
      </div>
      {showModal && <TimeSelectionModal setTimeControl={(time) => { setPlayerOneTime(time); setPlayerTwoTime(time); setShowModal(false); }} setShowModal={setShowModal} />}
    </div>
  );
};

export default ChessClock;
