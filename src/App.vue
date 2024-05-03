<script setup lang="ts">
import { ref as vRef } from "vue";
import Modal from "./components/Modal.vue";
import Collection from "./components/Collection.vue";
import Gachapon from "./components/Gachapon.vue";
import Card from "./components/Card.vue";
import GlobalCard from "./components/GlobalCard.vue";
import store from "./system";

const isOpen = vRef(!store.currentUser?.key);
const showUserHistory = vRef(false);
const toggleModal = (value) => {
  isOpen.value = typeof value === "boolean" ? value : !isOpen.value;
}
const toggleHistory = (value) => {
  showUserHistory.value = typeof value === "boolean" ? value : !showUserHistory.value;
}
const getSortedHistory = () => {
  return store.history
    .filter((i) => (showUserHistory ? i.user === store.currentUser.key : true))
    .sort((a, b) => b.timestamp - a.timestamp)
}
const getCheckCompleted = () => {
  return store.sortedBeans.length > 0 &&
    store.sortedBeans.length ===
    store.sortedBeans.filter((i) => store.currentUser.collectedBeans && store.currentUser.collectedBeans[i.key])
      .length
}

const variants = {
  open: {
    x: [-50, 0],
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.5,
    },
  },
  closed: {
    x: [50, 0],
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.5,
    },
  },
};
</script>

<template>
  <div class="App">
    <div class="max-w-[900px] mx-auto relative text-center">
      <div class="banner mb-4">
        <span class="bannertext">
          <span v-if="getCheckCompleted()">Congrats {{ store.currentUser.key }} on getting all the beans!</span>
          <span v-else-if="store.currentUser.key">Hi {{ store.currentUser.key }}!</span>
          <span v-else>Hello!</span>
        </span>
        <button class="buttontext uppercase mx-auto underline" @click="toggleModal(true)">
          Change user?
        </button>
      </div>
      <Gachapon :toggleHistory="() => !showUserHistory" :completed="getCheckCompleted()" />
      <div class="cardtitle mb-4">
        <span v-if="getCheckCompleted()">&infin;</span>
        <span v-else-if="store.currentUser.specialTickets > 0">
          Available Tickets: {{ store.currentUser.specialTickets }} (Special),
          {{ store.currentUser.tickets }} (Regular)
        </span>
        <span v-else>Available Tickets: {{ store.currentUser.tickets }}</span>
      </div>
      <button class="toggle-button md:absolute right-6 top-20" @click="toggleHistory">
        <span v-if="showUserHistory">See everyone's rolls</span>
        <span v-else>See your rolls</span>
      </button>
      <div class="transparent-clip h-[500px] overflow-auto">
        <div v-if="store.currentUser && Object.keys(store.beanDict).length > 0 && store.history.length > 0"
          class="p-4 flex flex-wrap gap-8 place-content-center">
          <div v-for="(i, index) in getSortedHistory().slice(0, 100)" :key="i.key + index">
            <Card v-motion :initial="{ opacity: 0, x: 50 }" :visible="{
              opacity: 1, x: 0,
              transition: {
                ease: 'easeIn',
                duration: 0.5,
              }
            }" v-show="showUserHistory" :index="index" :bean="store.beanDict[i.key]" :isNew="i.isNew" />
            <GlobalCard v-motion :initial="{ opacity: 0, x: -50 }" :visible="{
              opacity: 1, x: 0,
              transition: {
                ease: 'easeOut',
                duration: 0.5,
              }
            }" v-show="!showUserHistory" :index="index" :bean="store.beanDict[i.key]" :user="i.user" />
          </div>
        </div>
      </div>
    </div>
    <Modal :isOpen="isOpen" :toggleModal="toggleModal" />
    <Collection />
  </div>
</template>
