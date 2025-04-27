export type WordDetail = {
  word: string;
  indexFrom: number;
  indexTo: number;
};

export type ActiveWordWithIndex = {
  wordIndex: number;
  wordDetail: WordDetail;
};

export type CharAndColor = {
  char: string;
  charColor: string;
};

export type Data = [
  WordDetail[],
  CharAndColor[],
  { CursorPosition: number }
];

export type Statistics = {
  round: number;
  wpm: number;
  accuracy: number;
}[];