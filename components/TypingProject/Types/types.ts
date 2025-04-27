export interface CharAndColor {
  char: string;
  charColor: string;
}

export interface WordDetail {
  word: string;
  indexFrom: number;
  indexTo: number;
}

export interface CursorPosition {
  CursorPosition: number;
}

export type Data = [WordDetail[], CharAndColor[], CursorPosition];

export interface ActiveWordWithIndex {
  wordIndex: number;
  wordDetail: WordDetail;
}

export interface StatisticsEntry {
  round: number;
  wpm: number;
  accuracy: number;
}

export type Statistics = StatisticsEntry[]; 