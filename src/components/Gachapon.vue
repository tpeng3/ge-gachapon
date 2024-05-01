<script setup lang="ts">
import { ref as vRef } from "vue";
import { getDatabase, ref, runTransaction, set } from "firebase/database";
import { slugify } from "../helpers";
import useSystemStore, { UserData, Bean } from "../system";

const PACK_SIZE = 20;

const props = defineProps<{ toggleHistory: Function; completed: boolean }>();
const isRolling = vRef(false);

const beans = useSystemStore((state) => state.beans);
const currentUser = useSystemStore((state) => state.currentUser) as UserData;
const setCurrentUser = useSystemStore((state) => state.setCurrentUser);

const disabled = currentUser.tickets < 1 && currentUser.specialTickets < 1 && !props.completed;
const variants = {
  rolling: { y: [0, -25, 0], transition: { duration: 0.3 } },
  rolled: { y: 0, scale: 1 },
};

const calculateRandom = (pity = false, recent = false) => {
  let pool = beans;
  if (recent) {
    pool = beans.slice(-PACK_SIZE);
    // if user has collected all the special beans, use tickets for regular pool
    if (currentUser?.collectedBeans) {
      const check = pool.filter((i) => !currentUser?.collectedBeans[i.key]);
      if (check.length < 1) pool = beans;
    }
  }
  let selectedArray =
    pity && !props.completed ? pool.filter((i) => !currentUser.collectedBeans[i.key]) : pool;
  return selectedArray[Math.floor(Math.random() * selectedArray.length)];
};

const rollBean = () => {
  props.toggleHistory(true);
  isRolling.value = true;
  setTimeout(() => isRolling.value = false, 500);
  const pity = currentUser.pity > 9 && !props.completed;
  let roll: Bean;
  if (currentUser.specialTickets > 0) {
    roll = calculateRandom(pity, true);
  } else {
    roll = calculateRandom(pity);
  }
  const db = getDatabase();
  let isNew = false;
  // update popularity
  runTransaction(ref(db, `beans/${roll.key}`), (currentData) => {
    if (currentData) {
      if (!currentData.revealed) currentData.revealed = slugify(currentUser.key);
      currentData.popularity++;
    }
    return currentData;
  });
  // update user info
  runTransaction(ref(db, `users/${slugify(currentUser.key)}`), (currentData) => {
    if (currentData) {
      if (!props.completed) {
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
  });
};
</script>

<template>
  <button
    v-motion="isRolling ? 'rolling' : 'rolled'"
    @click="rollBean"
    :class="`${disabled ? 'brightness-75' : ''}`"
    :disabled="disabled"
    :variants="variants"
    :hovered="!disabled && { scale: 1.1 }"
  >
    <img src="/gachapon.png" />
  </button>
</template>
