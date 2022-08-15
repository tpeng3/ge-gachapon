import React from "react";
import { useState, useEffect } from "react";
import { getDatabase, ref, runTransaction, set } from "firebase/database";
import { slugify } from "./helpers";
import useSystemStore, { Bean } from "./system";

function Card() {
  const beanDict = useSystemStore((state) => state.beanDict);
  const setRolls = useSystemStore((state) => state.setRolls);
  const currentUser = useSystemStore((state) => state.currentUser);

  const calculateRandom = () => {
    const weights = [1]; // one (TODO: add 3 and 5 later)
    const cumulativeWeights = [];
    for (let i = 0; i < weights.length; i += 1) {
      cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
    }
    const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
    const randomNumber = maxCumulativeWeight * Math.random();
    const items: Bean[] = Object.values(beanDict);
    // Picking the random item based on its weight.
    // The items with higher weight will be picked more often.
    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
      if (cumulativeWeights[itemIndex] >= randomNumber) {
        console.log(itemIndex);
        return {
          roll: items[itemIndex],
          rarity: "one",
        };
      }
    }
  };

  const rollBean = () => {
    console.log(beanDict);
    const roll = calculateRandom();
    console.log(roll);

    const db = getDatabase();
    // update popularity
    runTransaction(ref(db, `beans/${roll.key}`), (currentData) => {
      if (currentData) {
        currentData--;
        if (currentData < 1) return null;
      }
      return currentData;
    });
    // update queue
    runTransaction(ref(db, `queue/${slugify(currentUser)}`), (currentData) => {
      if (currentData) {
        currentData--;
        if (currentData < 1) return null;
      }
      return currentData;
    });
    // update history
    const timestamp = Date.now();
    const record = {
      timestamp,
      key: roll.key,
      user: currentUser,
    };
    set(ref(db, `history/${timestamp}`), record);
  };

  return (
    <div id="frogchine">
      <div className="click-me fadeout block">CLICK ME</div>
      <button className="machine" onClick={() => rollBean()}>
        <img
          src="https://galesend.twohoot.net/catalogue/assets/i_quingee.png"
          id="frogpon"
          className="bounce"
        />
      </button>
      <button id="switch-cards">See your collection</button>
    </div>
  );
}

export default Card;
