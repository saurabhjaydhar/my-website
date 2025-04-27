import { createContext } from "react";

export interface PortfolioState {
  NavBar: {
    IntervalEvent: (() => void) | null;
    scrolling: boolean | null;
    scrollSizeY: number | null;
  };
  Scrolling: {
    IntervalEvent: (() => void) | null;
  };
}

export interface UserDataState {
  timerCookieRef: React.MutableRefObject<number | null>;
  windowSizeTracker: React.MutableRefObject<((this: Window, ev: UIEvent) => void) | null>;
  mousePositionTracker: React.MutableRefObject<((this: Window, ev: MouseEvent) => void) | null>;
}

export interface TypingState {
  keyboardEvent: ((this: Document, ev: KeyboardEvent) => void) | null;
  eventInputLostFocus: ((this: Window, ev: UIEvent) => void) | null;
}

export interface AppState {
  portfolio: PortfolioState;
  userdata: UserDataState;
  typing: TypingState;
  finishedLoading: boolean;
}

export interface AppContextType {
  sharedState: AppState;
  setSharedState: React.Dispatch<React.SetStateAction<AppState>>;
}

const createRef = <T extends unknown>(initialValue: T | null) => ({ current: initialValue });

export const defaultState: AppState = {
  portfolio: {
    NavBar: {
      IntervalEvent: null,
      scrolling: null,
      scrollSizeY: null,
    },
    Scrolling: {
      IntervalEvent: null,
    },
  },
  userdata: {
    timerCookieRef: createRef<number | null>(null),
    windowSizeTracker: createRef<((this: Window, ev: UIEvent) => void) | null>(null),
    mousePositionTracker: createRef<((this: Window, ev: MouseEvent) => void) | null>(null),
  },
  typing: {
    keyboardEvent: null,
    eventInputLostFocus: null,
  },
  finishedLoading: false,
};

const AppContext = createContext<AppContextType>({
  sharedState: defaultState,
  setSharedState: () => {},
});

export default AppContext;
