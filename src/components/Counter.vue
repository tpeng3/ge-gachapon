<script setup lang="ts">
import { ref as vRef, watchEffect } from "vue";
import { getDatabase, ref, runTransaction, set, onValue } from "firebase/database";
import { slugify } from "../helpers";

const errorMessage = vRef("");
const selectedUser = vRef("");
const queue: any = vRef({});

watchEffect(() => {
  const db = getDatabase();
  const userRef = ref(db, "users/");
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    data ? (queue.value = data) : (queue.value = {});
  });
});

const processTicket = (e: any) => {
  e.preventDefault(); // prevent page refresh
  const db = getDatabase();
  const name = e.target[0].value;
  const amount = e.target[1].value || 1;
  const isSpecial = e.target[2].checked || false;

  if (!name || isNaN(amount) || amount < 1 || amount > 1000) {
    errorMessage.value = "Invalid ticket form.";
    setTimeout(() => (errorMessage.value = ""), 5000);
    return;
  }
  runTransaction(ref(db, "users/" + slugify(name)), (currentData) => {
    if (currentData) {
      if (isSpecial) {
        currentData.specialTickets = parseInt(currentData.specialTickets) + parseInt(amount);
      } else {
        currentData.tickets = parseInt(currentData.tickets) + parseInt(amount);
      }
      errorMessage.value = `Added ${amount} ${isSpecial ? "special" : ""} tickets to ${name}!`;
      setTimeout(() => (errorMessage.value = ""), 5000);
      return currentData;
    } else {
      return {
        key: slugify(name),
        ...(isSpecial
          ? { specialTickets: amount, tickets: 0 }
          : { tickets: amount, specialTickets: 0 }),
        // collectedBeans: {} add in another transaction
      };
    }
  });
};

const removeTicket = (username: string) => {
  const db = getDatabase();
  set(ref(db, `users/${slugify(username)}/tickets`), 0);
  set(ref(db, `users/${slugify(username)}/specialTickets`), 0);
  selectedUser.value = "";
};
</script>

<template>
  <div class="max-w-[800px] w-full h-full mx-auto text-center">
    <form
      class="rounded-lg bg-beige border-2 border-red p-10 m-10 flex flex-col gap-8"
      @submit="(e) => processTicket(e)"
    >
      <h1 class="cardtitle">Add Ticket</h1>
      <div class="md:ml-[56px]">
        <label class="mr-8 md:text-right" htmlFor="name"> Name </label>
        <input type="text" id="name" name="name" />
      </div>
      <div>
        <label class="mr-8 md:text-right" htmlFor="amount">Ticket amount</label>
        <input type="number" id="amount" name="amount" placeholder="1" />
      </div>
      <div>
        <label class="mr-8 md:text-right" htmlFor="amount">Special ticket?</label>
        <input type="checkbox" id="special" name="special" />
      </div>
      <input class="toggle-button" type="submit" value="Submit" />
      <!-- Error Message -->
      <div class="text-red">{{ errorMessage }}</div>
    </form>

    <div class="rounded-lg bg-beige border-2 border-red p-10 m-10 flex flex-col gap-2">
      <h1 class="cardtitle">Current Users</h1>
      <div class="grid grid-cols-4">
        <span>Username</span>
        <span>Ticket</span>
        <span>Special Ticket</span>
        <span>Reset?</span>
      </div>
      <!-- can remove people in queue -->
      <div v-for="username in Object.keys(queue)" :key="username">
        <div v-if="queue[username]" class="grid grid-cols-4 items-center">
          <span>{{ username }}</span>
          <div>{{ queue[username].tickets }}</div>
          <div>{{ queue[username].specialTickets }}</div>
          <button
            className="border-2 border-red rounded-lg hover:bg-red"
            @click="selectedUser = username"
          >
            Reset
          </button>
        </div>
      </div>
      <!-- Confirmation Modal -->
      <div :class="['modal', selectedUser !== '' ? 'display' : 'hidden']">
        <div class="modal-content">
          <h1>Are you sure you want to remove all tickets for {{ selectedUser }}?</h1>
          <button class="button mr-6" @click="removeTicket(selectedUser)">Yes</button>
          <button class="button" @click="selectedUser = ''">No</button>
        </div>
      </div>
    </div>
  </div>
</template>
