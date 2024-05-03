<script setup lang="ts">
import store, { Bean } from "../system";
const props = defineProps<{ bean: Bean; index: number; isNew: boolean }>();
const star = props.bean.rarity ? "star_three" : props.bean.artist ? "star_two" : "star_one";
</script>

<template>
  <button v-motion :initial="index === 0 && { opacity: 0.2, scale: 0.2 }" :enter="index === 0 && {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 50,
      type: 'keyframes',
      ease: 'easeIn',
    },
  }
    " :hovered="{ scale: 1.1, transition: { duration: 0.1 } }" class="card" @click="store.setSelectedBean(bean)">
    <span v-if="isNew" class="new">NEW!</span>
    <img :src="`/beans/${bean.key}.png`" class="w-32 pixellated" />
    <div class="font-display uppercase text-red font-bold text-[25px]">
      {{ bean.name }}
    </div>
    <img :src="`/${star}.png`" class="pixellated top-0 left-0 absolute scale-[2]" />
  </button>
</template>
