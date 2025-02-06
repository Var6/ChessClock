'use client'
import React, { useState, useEffect } from "react";

const ChessClock = () => {
  const initialTime = 5 * 60; // 5 minutes
  const incrementTime = 1; // 1 second increment per move

  const [timeControl, setTimeControl] = useState(initialTime); // Time control in seconds (default 5 minutes)
  const [playerOneTime, setPlayerOneTime] = useState(initialTime);
  const [playerTwoTime, setPlayerTwoTime] = useState(initialTime);
  const [timerRunning, setTimerRunning] = useState(null); // 'playerOne', 'playerTwo', or null
  const [paused, setPaused] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  // Check if time is under 10 seconds
  const isLowTime = (time) => time < 100;

  useEffect(() => {
    let interval;
    if (timerRunning && !paused) {
      interval = setInterval(() => {
        if (timerRunning === "playerOne") {
          setPlayerOneTime((prev) => Math.max(prev - 1, 0));
        } else if (timerRunning === "playerTwo") {
          setPlayerTwoTime((prev) => Math.max(prev - 1, 0));
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning, paused]);

  const handleStartStop = (player) => {
    if (timerRunning === player) {
      // Add time increment when stopping the clock
      if (player === "playerOne") {
        setPlayerOneTime((prev) => Math.min(prev + incrementTime, timeControl));
      } else {
        setPlayerTwoTime((prev) => Math.min(prev + incrementTime, timeControl));
      }

      // Switch to the other player's timer
      setTimerRunning(player === "playerOne" ? "playerTwo" : "playerOne");
    } else {
      // Start the selected player's timer
      setTimerRunning(player);
    }
  };

  const handlePause = () => {
    setPaused((prev) => !prev); // Toggle pause state
  };

  const handleReset = () => {
    setPlayerOneTime(timeControl);
    setPlayerTwoTime(timeControl);
    setTimerRunning(null); // Reset timers
    setPaused(false); // Unpause if paused
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-7">
        <div
          onClick={() => timerRunning !== "playerTwo" && handleStartStop("playerOne")} // Disable click if it's not player one's time
          className={`p-6 text-2xl font-bold rounded-lg cursor-pointer ${timerRunning === "playerOne" ? "bg-blue-500" : "bg-gray-300"} ${isLowTime(playerOneTime) ? "bg-red-700 animate-pulse" : ""}`}
        >
          {formatTime(playerOneTime)}
        <p className="text-center text-xl text-black mt-2">White</p>
        </div>
        <div
          onClick={() => timerRunning !== "playerOne" && handleStartStop("playerTwo")} // Disable click if it's not player two's time
          className={`p-6 text-2xl font-bold rounded-lg cursor-pointer ${timerRunning === "playerTwo" ? "bg-blue-500 text-black " : "bg-gray-300"} ${isLowTime(playerTwoTime) ? "bg-red-700 animate-pulse" : ""}`}
        >
          {formatTime(playerTwoTime)}
          <p className="text-center text-xl text-black mt-2">Black</p>
        </div>
      </div>

      <div className="flex space-x-4 mt-4">
        <button
          onClick={handlePause}
          className="p-2 bg-yellow-500 text-white rounded"
        >
          {paused ? "Resume" : "Pause"}
        </button>
        <select
          onChange={(e) => {
            setTimeControl(Number(e.target.value));
            setPlayerOneTime(Number(e.target.value));
            setPlayerTwoTime(Number(e.target.value));
          }}
          value={timeControl}
          className="p-2 border border-gray-300 rounded"
        >
          <option value={300}>5 minutes</option>
          <option value={600}>10 minutes</option>
          <option value={900}>15 minutes</option>
          <option value={180}>3 minutes</option>
        </select>
      </div>

      <div className="mt-4">
        <button
          onClick={handleReset}
          className="p-2 bg-red-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ChessClock;
