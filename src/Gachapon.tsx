import React from "react";
import { getDatabase, ref, runTransaction, set } from "firebase/database";
import { slugify } from "./helpers";
import useSystemStore from "./system";

function Card() {
  const beansOne = useSystemStore((state) => state.beansOne);
  const beansThree = useSystemStore((state) => state.beansThree);
  const beansFive = useSystemStore((state) => state.beansFive);
  const currentUser = useSystemStore((state) => state.currentUser);
  const setCurrentUser = useSystemStore((state) => state.setCurrentUser);

  const calculateRandom = (pity = false) => {
    const elems = ["common", "rare", "super rare"]; // add rarity later
    const weights = [1, 0, 0];
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const weighedElems = [];
    let currentElem = 0;
    while (currentElem < elems.length) {
      for (let i = 0; i < weights[currentElem]; i++)
        weighedElems[weighedElems.length] = elems[currentElem];
      currentElem++;
    }
    const rarity = weighedElems[Math.floor(Math.random() * totalWeight)];
    let selectedArray = beansOne;
    switch (rarity) {
      case "common":
        // TODO: add pity logic for other rarity
        selectedArray = pity
          ? beansOne.filter((i) => !currentUser.collectedBeans[i.key])
          : beansOne;
        break;
      case "rare":
        selectedArray = beansThree;
        break;
      case "super rare":
        selectedArray = beansFive;
        break;
    }
    return selectedArray[Math.floor(Math.random() * beansOne.length)];
  };

  const rollBean = (infinite = false) => {
    const pity = currentUser.pity > 9 && !infinite;
    const roll = calculateRandom(pity);
    const db = getDatabase();
    // update popularity
    runTransaction(ref(db, `beans/${roll.key}`), (currentData) => {
      if (currentData) {
        if (!currentData.revealed)
          currentData.revealed = slugify(currentUser.key);
        currentData.popularity++;
      }
      return currentData;
    });
    // update user info
    runTransaction(
      ref(db, `users/${slugify(currentUser.key)}`),
      (currentData) => {
        if (currentData) {
          if (!infinite) currentData.tickets--;
          if (currentData.collectedBeans) {
            if (currentData.collectedBeans[roll.key]) {
              currentData.collectedBeans[roll.key]++;
              currentData.pity++;
            } else {
              currentData.collectedBeans[roll.key] = 1;
              currentData.pity = 0;
            }
          } else {
            currentData.collectedBeans = { [roll.key]: 1 };
            currentData.pity = 0;
          }
          setCurrentUser(currentData);
        }
        return currentData;
      }
    );
    // update history
    const timestamp = Date.now();
    const record = {
      timestamp,
      key: roll.key,
      user: currentUser.key,
    };
    set(ref(db, `history/${timestamp}`), record);
  };

  return (
    <div>
      <button onClick={() => rollBean()}>
        {/* TODO: change later to an actual gachapon sprite */}
        <img
          src="https://galesend.twohoot.net/catalogue/assets/i_quingee.png"
          id="frogpon"
          className="bounce"
        />
      </button>
    </div>
  );
}

export default Card;
