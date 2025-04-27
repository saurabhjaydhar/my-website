import React from 'react';
import { Data } from '../Types/types';

interface TypingTextProps {
  myText: Data;
}

const TypingText: React.FC<TypingTextProps> = ({ myText }) => {
  return (
    <div className="w-full max-w-3xl px-4">
      <div className="w-full font-mono text-sm sm:text-base md:text-lg break-all">
        {myText[1].map((item, index) => (
          <span key={index} className={item.charColor}>
            {item.char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TypingText; 