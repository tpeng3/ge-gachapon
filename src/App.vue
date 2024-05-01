<script setup lang="ts">
import { ref as vRef } from "vue";
import Modal from "./components/Modal.vue";
import Collection from "./components/Collection.vue";
import Gachapon from "./components/Gachapon.vue";
import Card from "./components/Card.vue";
import GlobalCard from "./components/GlobalCard.vue";
import useSystemStore from "./system";

const beanDict = useSystemStore((state) => state.beanDict);
const currentUser = useSystemStore((state) => state.currentUser);
const history = useSystemStore((state) => state.history);
const sortedBeans = useSystemStore((state) => state.sortedBeans);
const completed =
  sortedBeans.length ===
  sortedBeans.filter((i) => currentUser?.collectedBeans && currentUser.collectedBeans[i.key])
    .length;

const isOpen = vRef(false);
const userHistory = vRef(false);

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

const getBannerText = () => {
  if (completed) {
    return `Congrats ${currentUser.key} on getting all the beans!`;
  } else if (currentUser.key) {
    return `Hi ${currentUser.key}!`;
  } else {
    return `Hello!`;
  }
};

const renderTicketInfo = () => {
  if (completed) {
    return `&infin;`;
  } else if (currentUser.specialTickets > 0) {
    return `Available Tickets: ${currentUser.specialTickets} (Special), ${currentUser.tickets} (Regular)`;
  } else {
    return `Available Tickets: ${currentUser.tickets}`;
  }
};

const getCardHistory = () => {
  return history
    .filter((i) => (userHistory ? i.user === currentUser.key : true))
    .sort((a, b) => b.timestamp - a.timestamp);
};
</script>

<template>
  <div class="App">
    <div class="max-w-[900px] mx-auto relative text-center">
      <div class="banner mb-4">
        <span class="bannertext">{{ getBannerText() }}</span>
        <button class="buttontext uppercase mx-auto underline" @click="isOpen = true">
          Change user?
        </button>
      </div>
      <Gachapon :toggleHistory="() => !userHistory" :completed="completed" />
      <div class="cardtitle mb-4">
        {{ renderTicketInfo() }}
      </div>
      <button class="toggle-button md:absolute right-6 top-20" @click="!userHistory">
        <span v-if="userHistory">See everyone's rolls</span>
        <span v-else>See your rolls</span>
      </button>
      <div class="transparent-clip h-[500px] overflow-auto">
        <div
          v-motion="userHistory ? 'open' : 'closed'"
          :variants="variants"
          class="p-4 flex flex-wrap gap-8 place-content-center"
        >
          <div v-for="(i, index) in getCardHistory().slice(0, 100)" :key="i.key">
            <Card v-if="userHistory" :index="index" :bean="beanDict[i.key]" :isNew="i.isNew" />
            <GlobalCard v-else :index="index" :bean="beanDict[i.key]" :user="i.user" />
          </div>
        </div>
      </div>
    </div>

    <Modal :isOpen="isOpen" :toggleModal="() => !isOpen" />
    <Collection />
  </div>
</template>