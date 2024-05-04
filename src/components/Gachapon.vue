<script setup lang="ts">
import { ref as vRef } from "vue";
import { getDatabase, ref, runTransaction, set } from "firebase/database";
import store, { Bean } from "../system";

const PACK_SIZE = 20;

const props = defineProps<{ toggleHistory: Function; completed: boolean }>();
const isRolling = vRef(false);
const isDisabled = () => {
  const special = store.currentProfile?.toyshoptickets?.amount || 0;
  const ticket = store.currentProfile?.toyshopticket?.amount || 0;
  return special < 1 && ticket < 1 && !props.completed;
}

const calculateRandom = (pity = false, recent = false) => {
  let pool = store.beans;
  if (recent) {
    pool = store.beans.slice(-PACK_SIZE);
    // if user has collected all the special beans, use tickets for regular pool
    if (store.currentUser.collectedBeans) {
      const check = pool.filter((i) => !store.currentUser.collectedBeans[i.key]);
      if (check.length < 1) pool = store.beans;
    }
  }
  let selectedArray =
    pity && !props.completed ? pool.filter((i) => !store.currentUser.collectedBeans[i.key]) : pool;
  return selectedArray[Math.floor(Math.random() * selectedArray.length)];
};

const rollBean = async () => {
  props.toggleHistory(true);
  isRolling.value = true;
  setTimeout(() => {
    isRolling.value = false;
  }, 500);
  const pity = store.currentUser.pity > 9 && !props.completed;
  let roll: Bean;
  if (store.currentUser.specialTickets > 0) {
    roll = calculateRandom(pity, true);
  } else {
    roll = calculateRandom(pity);
  }
  let isNew = false;
  const db = getDatabase();

  // update popularity
  runTransaction(ref(db, `/beans/${roll.key}`), (currentData) => {
    if (currentData) {
      if (!currentData.revealed) currentData.revealed = store.currentUser.key;
      currentData.popularity++;
    }
    return currentData;
  });

  // update user info
  runTransaction(ref(db, `users/${store.currentUser.key}`), (currentData) => {
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
        store.setCurrentUser(currentData, store.currentProfile);
      }
      // update history
      const timestamp = Date.now();
      const record = {
        timestamp,
        key: roll.key,
        user: store.currentUser.key,
        isNew: isNew,
      };
      set(ref(db, `history/${timestamp}`), record);
    }
    return currentData;
  });

  // take ticket
  const ticketType = store.currentUser.specialTickets > 0 ? "toyshoptickets" : "toyshopticket";
  const response = await fetch(`https://data.mongodb-api.com/app/data-ycjna/endpoint/useTicket?id=${store.currentUser.id}&profile=${store.currentUser.key}&ticketType=${ticketType}`);
  const resultJson = await response.json();
  if (!resultJson || !resultJson.success) {
    alert("Error using ticket. Please contact Froggo.");
    return;
  };
  store.currentProfile[ticketType].amount--;
};
</script>

<template>
  <button @click="rollBean" :class="['gachapon', isRolling ? 'shake' : '']" :disabled="isDisabled()">
    <img src="/gachapon.png" />
  </button>
</template>
