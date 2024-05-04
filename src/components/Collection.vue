<script setup lang="ts">
import store, { Bean } from "../system";

const getAppLink = () => store.censusData.find((i) => i.IdNUM == store.selectedBean.idnum)?.appurl;
const getBeanCount = () => {
  const total = store.sortedBeans.length;
  const current = store.sortedBeans.filter(
    (i) => store.currentUser.collectedBeans[i.key]
  ).length;
  return `(${current} / ${total})`;
};

const getRarity = (bean: Bean) => {
  return bean.rarity ? "star_three" : bean.artist ? "star_two" : "star_one";
};
</script>

<template>
  <KeepAlive>
    <div class="modal" v-if="store.currentUser && store.selectedBean">
      <div class="w-full h-full" @click="store.setSelectedBean(null)"></div>
      <div class="fade modal-content w-full max-w-[900px] flex flex-col gap-2 max-h-screen">
        <button class="absolute top-1 right-4 p-2 cursor-pointer text-2xl hover:text-red"
          @click="store.setSelectedBean(null)">
          X
        </button>
        <div class="uppercase font-display font-bold text-3xl">
          Collected Beans {{ getBeanCount() }}
        </div>
        <div class="flex flex-col-reverse md:flex-row gap-10 overflow-hidden">
          <div class="flex flex-wrap gap-2 overflow-y-auto max-h-[500px] justify-center py-[5px]">
            <div v-for="bean in store.sortedBeans" :key="bean.key">
              <button v-if="store.currentUser.collectedBeans[bean.key]"
                :class="['card', store.selectedBean.key === bean.key ? 'bg-rose' : '']" :id="bean.key"
                @click="store.setSelectedBean(bean)">
                <img :src="`/beans/${bean.key}.png`" class="w-[5rem] md:w-[6rem] pixellated" />
                <div class="font-display uppercase text-red font-bold text-[25px]">
                  {{ bean.name }}
                </div>
                <img :src="`/${getRarity(bean)}.png`" class=" pixellated top-0 left-0 absolute scale-[1.5]" />
              </button>
              <div v-else class="blank-card">
                <img :src="`/beans/${bean.key}.png`" class="w-[6rem] pixellated brightness-0" />
                <div class="font-display uppercase font-bold text-[25px]">???</div>
                <img :src="`/${getRarity(bean)}.png`"
                  class="pixellated top-0 left-0 brightness-50 absolute scale-[1.5]" />
              </div>
            </div>
          </div>
          <div class="min-w-[200px] h-fit border-[3px] border-pink rounded-xl p-4">
            <div class="relative pb-4 flex flex-col items-center">
              <img :src="`/beans/${store.selectedBean.key}.png`" class="w-32 md:w-64 pixellated" />
              <img :src="`/${getRarity(store.selectedBean)}.png`" class="pixellated left-0 absolute scale-[2] top-2" />
              <div class="cardtitle">{{ store.selectedBean.name }}</div>
              <div class="cardtitle">Belongs to {{ store.selectedBean.mun }}</div>
              <div class="cardtitle mb-4">
                {{
                  store.currentUser.collectedBeans[store.selectedBean.key] &&
                  `Found ${store.currentUser.collectedBeans[store.selectedBean.key]} times`
                }}
              </div>
              <a v-if="store.selectedBean.idnum > 0" target="_blank" rel="noreferrer noopener" class="toggle-button"
                :href="getAppLink()">
                View Link
              </a>
              <span v-if="store.selectedBean.artist" class="footnote absolute top-0 right-0">
                Contributed by {{ store.selectedBean.artist }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </KeepAlive>
</template>
