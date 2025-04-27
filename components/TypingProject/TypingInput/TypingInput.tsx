import React, { MutableRefObject } from 'react';
import { Data, ActiveWordWithIndex } from '../Types/types';

interface TypingInputProps {
  inputRef: MutableRefObject<HTMLInputElement | null>;
  setInputLostFocus: React.Dispatch<React.SetStateAction<boolean>>;
  activeWordWithIndex: ActiveWordWithIndex;
  setActiveWordWithIndex: React.Dispatch<React.SetStateAction<ActiveWordWithIndex>>;
  myText: Data;
  setMyText: React.Dispatch<React.SetStateAction<Data>>;
  setIsFinished: React.Dispatch<React.SetStateAction<boolean>>;
  timerCountingInterval: MutableRefObject<NodeJS.Timeout | undefined>;
  updateStatistics: () => void;
}

const TypingInput: React.FC<TypingInputProps> = ({
  inputRef,
  setInputLostFocus,
  activeWordWithIndex,
  setActiveWordWithIndex,
  myText,
  setMyText,
  setIsFinished,
  timerCountingInterval,
  updateStatistics,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    
    // Reset colors for current word
    for (let j = activeWordWithIndex.wordDetail.indexFrom; j < myText[1].length; j++) {
      myText[1][j].charColor = "text-gray-500";
    }

    // Check each character
    let targetWordIndexIncrement = activeWordWithIndex.wordDetail.indexFrom;
    input.split("").forEach((element) => {
      if (targetWordIndexIncrement < myText[1].length) {
        myText[1][targetWordIndexIncrement].charColor =
          element === myText[1][targetWordIndexIncrement].char ? "text-AAsecondary" : "text-AAError";
        targetWordIndexIncrement++;
      }
    });

    // Check if word is complete
    if (input === activeWordWithIndex.wordDetail.word) {
      const nextWordIndex = activeWordWithIndex.wordIndex + 1;
      setActiveWordWithIndex({
        wordIndex: nextWordIndex,
        wordDetail: myText[0][nextWordIndex],
      });
      event.target.value = "";
    }

    // Update cursor position
    for (let i = 0; i < myText[1].length; i++) {
      if (myText[1][i].charColor === "text-gray-500") {
        myText[2].CursorPosition = i;
        break;
      }
    }
    setMyText([...myText]);

    // Check if typing is finished
    if (myText[1][myText[1].length - 1].charColor !== "text-gray-500") {
      updateStatistics();
      myText[1] = [];
      setMyText([...myText]);
      setIsFinished(true);
      if (timerCountingInterval.current) {
        clearInterval(timerCountingInterval.current);
      }
    }
  };

  return (
    <div className="w-full max-w-3xl px-4 mt-8">
      <input
        ref={inputRef}
        type="text"
        onChange={handleInputChange}
        onFocus={() => setInputLostFocus(false)}
        onBlur={() => setInputLostFocus(true)}
        className="w-full px-4 py-2 text-gray-200 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-AAsecondary"
        placeholder="Type here..."
        autoComplete="off"
      />
    </div>
  );
};

export default TypingInput; 