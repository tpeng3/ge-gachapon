import create from "zustand";

interface Bean {
  key: string;
  charaname: string;
  mun: string,
  direction: "left" | "right",
  rarity: number,
  imgurl: string,
  revealed: boolean,
  popularity: number
}

interface SystemState {
  beanDict: {[key:string]: Bean};
  queue: {[user:string]: number};
  history: {
    key: string;
    user: string;
    timestamp: Date;
  }[];
  currentUser: string | null;
  availableRolls: number;
}

const initialState = {
  beanDict: {},
  queue: {},
  history: [],
  currentUser: window.localStorage.getItem("currentuser"),
  availableRolls: 0,
};

/**
 * Bean functions
 */
// only on page load
const initBeanDict = (value: {[key:string]: Bean}) => ({ beanDict: value });

// after an action
const updateQueue = (value: {[key:string]: Bean}) => ({ beanDict: value });
const updateHistory = (value: {[key:string]: Bean}) => ({ beanDict: value });

const setUsername = (value: string) => ({ currentUser: value });
const setRolls = (value: number) => ({ availableRolls: value });

/**
 * Init store
 */
const useSystemStore: any = create<SystemState>((set) => ({
  ...initialState,
  initBeanDict: (value) => set(() => initBeanDict(value)),
  updateQueue: (value) => set(() => updateQueue(value)),
  updateHistory: (value) => set(() => updateHistory(value)),
  setUsername: (value) => set(() => setUsername(value)),
  setRolls: (value) => set(() => setRolls(value)),
}));

export default useSystemStore;
