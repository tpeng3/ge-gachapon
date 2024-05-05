import { reactive } from 'vue'

export interface Bean {
  key: string;
  census: string;
  name: string;
  mun: string,
  direction: string,
  idnum: number,
  revealed: boolean,
  popularity: number,
  artist: string,
  rarity: string
}

export interface UserData {
  key: string;
  pity: number;
  collectedBeans: { [key: string]: number }
}

export interface History {
  key: string;
  user: string;
  timestamp: number;
  isNew: boolean;
}

export interface ProfileInventory {
  [key: string]: { amount: number }
}

interface SystemState {
  censusData: any;
  beanDict: { [key: string]: Bean };
  sortedBeans: Bean[];
  beans: Bean[];
  queue: { [user: string]: number };
  history: History[];
  currentUser: any;
  currentProfile: ProfileInventory;
  selectedBean: Bean | null;
  updateCatalogue: (value: any) => void;
  initBeanDict: (value: Bean[], beanList: { [key: string]: Bean }) => void;
  updateHistory: (value: History[]) => void;
  setCurrentUser: (value: UserData, profile: ProfileInventory) => void;
  setSelectedBean: (value: Bean | null) => void;
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
} as SystemState;

/**
 * Init store
 */
const store = reactive({
  ...initialState,

  // only on page load
  updateCatalogue(value: { [key: string]: Bean }) {
    this.censusData = value;
  },
  initBeanDict(beanList, value: { [key: string]: Bean }) {
    const beanObj: { [key: string]: Bean } = beanList.filter(i => i.key !== "").reduce((obj, item) => {
      return {
        ...obj,
        [item.key]: {
          ...item,
          rarity: item.rarity === "TRUE" ? "star_three" : item.artist ? "star_two" : "star_one",
        },
      };
    }, {});
    const beans = { ...value, ...beanObj }
    const sortedBeans = Object.values(beans).sort((a, b) => a.key.localeCompare(b.key));
    console.log(beans)
    this.beanDict = beans;
    this.beans = Object.values(beans);
    this.sortedBeans = sortedBeans;
  },

  // after an action
  updateHistory(value: History[]) {
    this.history = value;
  },
  setCurrentUser(value: UserData, profile: ProfileInventory) {
    this.currentUser = value;
    this.currentProfile = profile;
  },
  setSelectedBean(value: Bean) {
    this.selectedBean = value;
  }
});

export default store;
