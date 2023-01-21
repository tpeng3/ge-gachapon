import React, { useState } from "react";
import { getDatabase, ref, runTransaction, set } from "firebase/database";
import { slugify } from "./helpers";
import useSystemStore from "./system";
import { motion } from "framer-motion";
import gachapic from "./images/gachapon.png";

function Gachapon({ toggleHistory, completed }) {
  const beans = useSystemStore((state) => state.beans);
  const currentUser = useSystemStore((state) => state.currentUser);
  const setCurrentUser = useSystemStore((state) => state.setCurrentUser);
  const [isRolling, toggleRolling] = useState(false);
  const disabled = currentUser.tickets < 1 && currentUser.specialTickets < 1 && !completed;

  const variants = {
    rolling: { y: [0, -25, 0], transition: { duration: 0.3 } },
    // You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
    rolled: {
      y: 0,
      scale: 1,
    },
  };

  const calculateRandom = (pity = false, filter = null) => {
    let pool = beans;
    if (filter) {
      pool = beans.filter(i => i.pack === filter)
      // if user has collected all the special beans, use tickets for regular pool
      if (currentUser?.collectedBeans) {
        const check = pool.filter((i) => !currentUser?.collectedBeans[i.key]);
        if (check.length < 1) pool = beans;
      }
    }
    let selectedArray =
      pity && !completed
        ? pool.filter((i) => !currentUser.collectedBeans[i.key])
        : pool;
    return selectedArray[Math.floor(Math.random() * selectedArray.length)];
  };

  const rollBean = () => {
    toggleHistory(true);
    toggleRolling(true);
    setTimeout(() => toggleRolling(false), 500);
    const pity = currentUser.pity > 9 && !completed;
    let roll;
    if (currentUser.specialTickets > 0) {
      roll = calculateRandom(pity, 2); // TODO: better filters later
    } else {
      roll = calculateRandom(pity);
    }
    const db = getDatabase();
    let isNew = false;
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
          if (!completed) {
            if (currentData.specialTickets > 0) {
              currentData.specialTickets--;
            } else {
              currentData.tickets--;
            }
            if (currentData.collectedBeans) {
              if (currentData.collectedBeans[roll.key]) {
                currentData.collectedBeans[roll.key]++;
                currentData.pity++;
              } else {
                isNew = true;
                currentData.collectedBeans[roll.key] = 1;
                currentData.pity = 0;
              }
            } else {
              isNew = true;
              currentData.collectedBeans = { [roll.key]: 1 };
              currentData.pity = 0;
            }
            setCurrentUser(currentData);
          }
          // update history
          const timestamp = Date.now();
          const record = {
            timestamp,
            key: roll.key,
            user: currentUser.key,
            isNew: isNew,
          };
          set(ref(db, `history/${timestamp}`), record);
        }
        return currentData;
      }
    );
  };

  return (
    <div>
      <motion.button
        className={`${disabled ? "brightness-75" : ""}`}
        onClick={() => rollBean()}
        disabled={disabled}
        animate={isRolling ? "rolling" : "rolled"}
        variants={variants}
        whileHover={!disabled && { scale: 1.1 }}
      >
        <img src={gachapic} />
      </motion.button>
    </div>
  );
}

export default Gachapon;
