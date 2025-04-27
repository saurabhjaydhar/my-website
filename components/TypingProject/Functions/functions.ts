import { WordDetail, Data, ActiveWordWithIndex, Statistics, CharAndColor } from "../Types/types";

/**
 * @note use minLength & maxLength to limit the quote length
 * @default_URL : https://api.quotable.io/random?minLength=100&maxLength=140
 */
export const getData = async (
  setMyText: React.Dispatch<React.SetStateAction<Data>>,
  setActiveWordWithIndex: React.Dispatch<React.SetStateAction<ActiveWordWithIndex>>,
  setRoundCounter: React.Dispatch<React.SetStateAction<number>>,
  roundCounter: number
): Promise<void> => {
  try {
    const response = await fetch(`/api/typing/100`);
    const data = await response.json();
    const words = data.quote.split(" ");
    const chars: CharAndColor[] = words.flatMap((word: string) =>
      word.split("").map((char: string) => ({
        char,
        charColor: "text-gray-500",
      }))
    );
    setMyText([words, chars, { CursorPosition: 0 }]);
    setActiveWordWithIndex({
      wordIndex: 0,
      wordDetail: {
        word: words[0],
        indexFrom: 0,
        indexTo: words[0].length - 1,
      },
    });
    setRoundCounter(roundCounter + 1);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// this function will calculate the wpm
export const calculateWpm = (chars: CharAndColor[], timeInSeconds: number): number => {
  const correctChars = chars.filter((char) => char.charColor === "text-AAsecondary").length;
  const words = Math.floor(correctChars / 5);
  const minutes = timeInSeconds / 60;
  return Math.round(words / minutes);
};

// this function will calculate the accuracy
export const calculateAccuracy = (chars: CharAndColor[]): number => {
  const totalChars = chars.length;
  const correctChars = chars.filter((char) => char.charColor === "text-AAsecondary").length;
  return Math.round((correctChars / totalChars) * 100);
};

// this will handle onCharChange event and will update the states
export const handleOnChangeInput = (
  input: string,
  event: React.ChangeEvent<HTMLInputElement>,
  activeWordWithIndex: ActiveWordWithIndex,
  setActiveWordWithIndex: React.Dispatch<React.SetStateAction<ActiveWordWithIndex>>,
  myText: Data,
  setMyText: React.Dispatch<React.SetStateAction<Data>>,
  setIsFinished: React.Dispatch<React.SetStateAction<boolean>>,
  timerCountingInterval: React.MutableRefObject<any>,
  updateStatistics: () => void,
) => {
  /**
   * @nextForLoop
   * this for loop to give the char its default color back, starting from activeWord first char index
   * this loop will help  when user delete a character
   */
  for (let j = activeWordWithIndex.wordDetail.indexFrom; j < myText[1].length; j++) {
    myText[1][j].charColor = "text-gray-500";
  }

  // start validating from this index CharIndex initial
  let targetWordIndexIncrement = activeWordWithIndex.wordDetail.indexFrom;
  input.split("").forEach((element) => {
    myText[1][targetWordIndexIncrement].charColor =
      element === myText[1][targetWordIndexIncrement].char ? "text-AAsecondary" : "text-AAError";
    targetWordIndexIncrement++;
  });
  // checks if input is equal to the active word ( true => set inputValue to "" )
  if (input === activeWordWithIndex.wordDetail.word) {
    const nextWordIndex = activeWordWithIndex.wordIndex + 1;
    setActiveWordWithIndex({
      wordIndex: nextWordIndex,
      wordDetail: myText[0][nextWordIndex],
    });
    event.target.value = ""; // clear the input
  }

  // set the cursor position to next target Char that will be typed of the active word
  /**
   * @note : normal for loop is used here to break the loop
   */
  for (let i = 0; i < myText[1].length; i++) {
    if (myText[1][i].charColor === "text-gray-500") {
      myText[2].CursorPosition = i;
      break;
    }
  }
  setMyText([...myText]); // update the state
  // Checking if the user finished typing by checking if the last char gray color is changed!
  if (myText[1][myText[1].length - 1].charColor !== "text-gray-500") {
    console.log("Player Finished typing!!");
    updateStatistics(); // update statistics
    /**
     * @note :  next line will prevent from showing the previous text when user restarts
     *  by checking !(myText[1].length==0)
     */
    myText[1] = [];
    setMyText([...myText]);
    setIsFinished(true);
    clearInterval(timerCountingInterval.current); // stop the timer
  }
};
