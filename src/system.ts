import create from "zustand";

export interface Bean {
  key: string;
  name: string;
  mun: string,
  direction: "left" | "right",
  rarity: number,
  revealed: boolean,
  popularity: number
}

export interface UserData {
  key?: string;
  tickets?: number;
  collectedBeans?: {[key:string]: number}
}

export interface History {
    key: string;
    user: string;
    timestamp: number;
}

interface SystemState {
  beanDict: {[key:string]: Bean};
  sortedBeans: Bean[];
  beansOne: Bean[];
  beansThree: Bean[];
  beansFive: Bean[];
  queue: {[user:string]: number};
  history: History[];
  currentUser: UserData;
  selectedBean: Bean | null;
  initBeanDict: Function;
  updateHistory: Function;
  setCurrentUser: Function;
  setSelectedBean: Function;
}

const initialState = {
  beanDict: {},
  sortedBeans: [],
  beansOne: [],
  beansThree: [],
  beansFive: [],
  queue: {},
  history: [],
  currentUser: {},
  selectedBean: null
};

/**
 * Bean functions
 */
// only on page load
const initBeanDict = (value: {[key:string]: Bean}) => {
  const beansOne = Object.values(value).filter(i => i.rarity === 1);
  const beansThree = Object.values(value).filter(i => i.rarity === 3);
  const beansFive = Object.values(value).filter(i => i.rarity === 5);
  const sortedBeans = Object.values(value).sort((a, b) => a.key.localeCompare(b.key));
  return {
    beanDict: value,
    beansOne,
    beansThree,
    beansFive,
    sortedBeans
  }
};

// after an action
const updateHistory = (value: History[]) => ({ history: value });
const setCurrentUser = (value: UserData) => ({ currentUser: value });
const setSelectedBean = (value: Bean) => ({ selectedBean: value });

/**
 * Init store
 */
const useSystemStore = create<SystemState>((set) => ({
  ...initialState,
  initBeanDict: (value: {[key:string]: Bean}) => set(() => initBeanDict(value)),
  updateHistory: (value: History[]) => set(() => updateHistory(value)),
  setCurrentUser: (value: UserData) => set(() => setCurrentUser(value)),
  setSelectedBean: (value: Bean) => set(() => setSelectedBean(value)),
}));

export default useSystemStore;
