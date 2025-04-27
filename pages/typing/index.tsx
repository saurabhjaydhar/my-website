import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { getData, calculateWpm, calculateAccuracy } from "../../components/TypingProject/Functions/functions";
import { Data, ActiveWordWithIndex, Statistics } from "../../components/TypingProject/Types/types";
import TimerSpan from "../../components/TypingProject/timer/TimerSpan";
import TypingStatistics from "../../components/TypingProject/Statistics/TypingStatistics";
import TypingInput from "../../components/TypingProject/TypingInput/TypingInput";
import TypingText from "../../components/TypingProject/TypingText/TypingText";

export default function Typing() {
  const [myText, setMyText] = useState<Data>([[], [], { CursorPosition: 0 }]);
  const [activeWordWithIndex, setActiveWordWithIndex] = useState<ActiveWordWithIndex>({
    wordIndex: 0,
    wordDetail: {
      word: "",
      indexFrom: 0,
      indexTo: 0
    }
  });
  const [roundCounter, setRoundCounter] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputLostFocus, setInputLostFocus] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<Statistics>([]);
  const seconds = useRef<number>(60);
  const timerCountingInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    getData(setMyText, setActiveWordWithIndex, setRoundCounter, roundCounter);
  }, [roundCounter]);

  const updateStatistics = useCallback(() => {
    const wpm = calculateWpm(myText[1], 60 - seconds.current);
    const accuracy = calculateAccuracy(myText[1]);
    setStatistics(prev => [...prev, { round: roundCounter, wpm, accuracy }]);
  }, [myText, roundCounter]);

  const restart = useCallback(() => {
    setIsFinished(false);
    seconds.current = 60;
    getData(setMyText, setActiveWordWithIndex, setRoundCounter, roundCounter);
  }, [roundCounter]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "/") {
      event.preventDefault();
      restart();
    }
  }, [restart]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="w-full h-screen bg-AAprimary flex flex-col items-center">
      {!isFinished ? (
        <div className="w-full h-full flex flex-col items-center">
          <div className="h-8 sm:h-12 my-4 flex items-center">
            <TimerSpan
              setIsFinished={setIsFinished}
              inputLostFocus={inputLostFocus}
              seconds={seconds}
              timerCountingInterval={timerCountingInterval}
              updateStatistics={updateStatistics}
            />
          </div>
          <div className="relative w-full h-full flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center"
            >
              <TypingText myText={myText} />
              <TypingInput
                inputRef={inputRef}
                setInputLostFocus={setInputLostFocus}
                activeWordWithIndex={activeWordWithIndex}
                setActiveWordWithIndex={setActiveWordWithIndex}
                myText={myText}
                setMyText={setMyText}
                setIsFinished={setIsFinished}
                timerCountingInterval={timerCountingInterval}
                updateStatistics={updateStatistics}
              />
            </motion.div>
          </div>
        </div>
      ) : (
        <TypingStatistics
          restart={restart}
          statistics={statistics}
          roundCounter={roundCounter}
          timeToType={60}
          seconds={seconds}
        />
      )}
    </div>
  );
}
