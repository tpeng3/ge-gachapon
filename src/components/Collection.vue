<script setup lang="ts">
import useSystemStore, { Bean } from "../system";

const currentUser = useSystemStore((state) => state.currentUser);
const setSelectedBean = useSystemStore((state) => state.setSelectedBean);
const selectedBean = useSystemStore((state) => state.selectedBean);
const sortedBeans = useSystemStore((state) => state.sortedBeans);
const censusData = useSystemStore((state) => state.censusData);

const findAppLink = () => {
  const data = selectedBean && censusData.find((i) => i.IdNUM == selectedBean.idnum);
  return data && data.appurl;
};

const calculateBeanCount = () => {
  const total = sortedBeans.value.length;
  const current = sortedBeans.value.filter(
    (i) => currentUser?.collectedBeans && currentUser.collectedBeans[i.key]
  ).length;
  return `(${current} / ${total})`;
};

const getRarity = (bean: Bean) => {
  return bean.rarity ? "star_three" : bean.artist ? "star_two" : "star_one";
};
</script>

<template>
  <div class="['modal', selectedBean ? 'block' : 'hidden']">
    <div class="w-full h-full" @click="() => setSelectedBean(null)"></div>
    <div class="modal-content w-full max-w-[900px] flex flex-col gap-2 max-h-screen">
      <button
        class="absolute top-1 right-4 p-2 cursor-pointer text-2xl hover:text-red"
        @click="() => setSelectedBean(null)"
      >
        X
      </button>
      <div class="uppercase font-display font-bold text-3xl">
        Collected Beans {{ sortedBeans && calculateBeanCount() }}
      </div>
      <div class="flex flex-col-reverse md:flex-row gap-10 overflow-hidden">
        <div class="flex flex-wrap gap-2 overflow-y-auto max-h-[500px] justify-center py-[5px]">
          <div v-for="bean in sortedBeans" :key="bean.key">
            <button
              v-if="currentUser?.collectedBeans && currentUser?.collectedBeans[bean.key]"
              :class="['card', selectedBean && selectedBean.key === bean.key ? 'bg-rose' : '']"
              :id="bean.key"
              @click="() => setSelectedBean(bean)"
            >
              <img
                :src="`/beans/${bean.key}.png`"
                class="w-[5rem] md:w-[6rem] pixellated"
              />
              <div class="font-display uppercase text-red font-bold text-[25px]">
                {{ bean.name }}
              </div>
              <img
                :src="`/${getRarity(bean)}.png`"
                class=" pixellated top-0 left-0 absolute scale-[1.5]"
              />
            </button>
            <div v-else class="blank-card">
              <img
                :src="`/beans/${bean.key}.png`"
                class="w-[6rem] pixellated brightness-0"
              />
              <div class="font-display uppercase font-bold text-[25px]">???</div>
              <img
              :src="`/${getRarity(bean)}.png`"
                class="pixellated top-0 left-0 brightness-50 absolute scale-[1.5]"
              />
            </div>
          </div>
          <div
            class="min-w-[200px] h-fit border-[3px] border-pink rounded-xl p-4"
            v-if="selectedBean"
          >
            <div class="relative pb-4 flex flex-col items-center">
              <img
                :src="`/beans/${selectedBean.key}.png`"
                class="w-32 md:w-64 pixellated"
              />
              <img
                :src="`/${getRarity(selectedBean)}.png`"
                class="pixellated left-0 absolute scale-[2] top-2"
              />
              <div class="cardtitle">{{ selectedBean.name }}</div>
              <div class="cardtitle">Belongs to {{ selectedBean.mun }}</div>
              <div class="cardtitle mb-4">
                {{
                  currentUser?.collectedBeans[selectedBean.key] &&
                  `Found ${currentUser?.collectedBeans[selectedBean.key]} times`
                }}
              </div>
              <a
                v-if="selectedBean.idnum > 0"
                target="_blank"
                rel="noreferrer noopener"
                class="toggle-button"
                :href="findAppLink()"
              >
                View Link
              </a>
              <span v-if="selectedBean.artist" class="footnote absolute top-0 right-0">
                Contributed by {bean.artist}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
