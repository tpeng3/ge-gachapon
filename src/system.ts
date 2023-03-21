import create from "zustand";
import BEAN_LIST from "./beans.json";

export interface Bean {
  key: string;
  census: string;
  name: string;
  mun: string,
  direction: "left" | "right",
  idnum: number,
  pack: number,
  revealed: boolean,
  popularity: number,
  artist?: string,
  rarity?: boolean
}

export interface UserData {
  key?: string;
  tickets?: number;
  specialTickets?: number;
  pity?: number;
  collectedBeans?: { [key: string]: number }
}

export interface History {
  key: string;
  user: string;
  timestamp: number;
  isNew: boolean;
}

interface SystemState {
  censusData: any;
  beanDict: { [key: string]: Bean };
  sortedBeans: Bean[];
  beans: Bean[];
  queue: { [user: string]: number };
  history: History[];
  currentUser: UserData;
  selectedBean: Bean | null;
  updateCatalogue: Function;
  initBeanDict: Function;
  updateHistory: Function;
  setCurrentUser: Function;
  setSelectedBean: Function;
}

const initialState = {
  censusData: {},
  beanDict: {},
  sortedBeans: [],
  beans: [],
  queue: {},
  history: [],
  currentUser: {},
  selectedBean: null
};

/**
 * Bean functions
 */
// only on page load
const updateCatalogue = (value: { [key: string]: Bean }) => ({ censusData: value });
const initBeanDict = (value: { [key: string]: Bean }) => {
  const beanObj: { [key: string]: Bean } = BEAN_LIST.filter(i => i.key !== "").reduce((obj, item) => {
    return {
      ...obj,
      [item.key]: item,
    };
  }, {});
  const beans = { ...value, ...beanObj }
  const sortedBeans = Object.values(beans).sort((a, b) => a.key.localeCompare(b.key));
  return {
    beanDict: beans,
    beans: Object.values(beans),
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
  updateCatalogue: (value) => set(() => updateCatalogue(value)),
  initBeanDict: (value: { [key: string]: Bean }) => set(() => initBeanDict(value)),
  updateHistory: (value: History[]) => set(() => updateHistory(value)),
  setCurrentUser: (value: UserData) => set(() => setCurrentUser(value)),
  setSelectedBean: (value: Bean) => set(() => setSelectedBean(value)),
}));

export default useSystemStore;
