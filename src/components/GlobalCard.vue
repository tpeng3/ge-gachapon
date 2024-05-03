<script setup lang="ts">
import { Bean } from "../system";
const props = defineProps<{ bean: Bean; index: number; user: string }>();
const star = props.bean.rarity ? "star_three" : props.bean.artist ? "star_two" : "star_one";
</script>

<template>
  <div v-motion :initial="index === 0 && { opacity: 0.2, scale: 0.2 }" :enter="index === 0 && {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 50,
      type: 'keyframes',
      ease: 'easeIn',
    },
  }
    " class="global-card">
    <img :src="`/beans/${bean.key}.png`" class="w-32 pixellated" />
    <div class="font-display uppercase text-red font-bold text-[25px]"></div>
    <div class="font-display uppercase text-red font-bold text-[25px]">
      Rolled by
      <br />
      {{ user }}
    </div>
    <img :src="`/${star}.png`" class="pixellated top-0 left-0 absolute scale-[2]" />
  </div>
</template>
