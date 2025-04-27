import React from 'react';

interface TimerProps {
  secUnits: React.RefObject<HTMLSpanElement>;
  secTens: React.RefObject<HTMLSpanElement>;
  minUnits: React.RefObject<HTMLSpanElement>;
  minTens: React.RefObject<HTMLSpanElement>;
}

export default function Timer({
  secUnits,
  secTens,
  minUnits,
  minTens,
}: TimerProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex items-center space-x-2">
        <span ref={minTens} className="text-2xl font-bold text-AAsecondary">0</span>
        <span ref={minUnits} className="text-2xl font-bold text-AAsecondary">0</span>
        <span className="text-2xl font-bold text-AAsecondary">:</span>
        <span ref={secTens} className="text-2xl font-bold text-AAsecondary">0</span>
        <span ref={secUnits} className="text-2xl font-bold text-AAsecondary">0</span>
      </div>
      <p className="text-sm text-gray-400">Time spent on this page</p>
    </div>
  );
}
