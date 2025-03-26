'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';

export default function TimeSelectionModal({ setTimeControl, setShowModal }) {
  const [customTime, setCustomTime] = useState('');
  const presetTimes = [180, 300, 600, 900]; // 3, 5, 10, 15 minutes

  const handleSelectTime = (time) => {
    setTimeControl(time);
    setShowModal(false);
  };

  const handleCustomTime = () => {
    const parsedTime = parseInt(customTime, 10);
    if (!isNaN(parsedTime) && parsedTime > 0) {
      setTimeControl(parsedTime * 60); // Convert minutes to seconds
      setShowModal(false);
    }
  };

  return (
    <Dialog open={true} onClose={() => setShowModal(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <Dialog.Title className="text-2xl font-bold mb-4">Select Time Control</Dialog.Title>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {presetTimes.map((time) => (
            <button 
              key={time} 
              onClick={() => handleSelectTime(time)} 
              className="p-2 bg-blue-500 text-white rounded-lg"
            >
              {time / 60} min
            </button>
          ))}
        </div>
        <input
          type="number"
          placeholder="Custom (min)"
          value={customTime}
          onChange={(e) => setCustomTime(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />
        <button 
          onClick={handleCustomTime} 
          className="w-full p-2 bg-green-500 text-white rounded-lg"
        >
          Set Custom Time
        </button>
      </Dialog.Panel>
    </Dialog>
  );
}
