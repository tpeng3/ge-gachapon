<script setup lang="ts">
import { ref as vRef } from "vue";
import { getDatabase, ref, onValue } from "firebase/database";
import { slugify } from "../helpers";
import store from "../system";

const props = defineProps<{ isOpen: boolean; toggleModal: Function }>();
const errorMessage = vRef("");

const savedname = window.localStorage.getItem("username");
if (savedname && store.censusData) {
  await setUserProfile(savedname);
  if (store.currentUser) {
    props.toggleModal(false);
  } else {
    props.toggleModal(true);
  }
} else {
  props.toggleModal(true);
}

const setUser = async (e: any) => {
  e.preventDefault(); // prevent page refresh
  const name = e.target[0].value;
  if (!name) return updateError("Name can't be empty.");
  await setUserProfile(name);
};

const updateError = (msg: string) => {
  errorMessage.value = msg;
};

async function setUserProfile(name) {
  // find profile first
  const chara = store.censusData.find(i => i.homesteadprofile.toLowerCase() === name.toLowerCase());
  if (!chara) return updateError("Sorry, this name hasn't been registered yet. Please check with a cashier!");

  const profileId = slugify(chara.homesteadprofile);

  // fetch mongo database
  const profileResponse = await fetch(`https://data.mongodb-api.com/app/data-ycjna/endpoint/getProfile?id=${chara.discordID}&profile=${profileId}`);
  const profileJson = await profileResponse.json();
  if (!profileJson || !profileJson[profileId]) return updateError("Sorry, couldn't find your toyshop tickets. Please check with a cashier!");

  const db = getDatabase();
  onValue(
    ref(db, `/users/${profileId}`),
    (snapshot) => {
      const data = snapshot.val();
      if (data) {
        data.id = chara.discordID;
        data.key = profileId;
        window.localStorage.setItem("username", profileId);
        store.setCurrentUser(data, profileJson[profileId]);
        props.toggleModal(false);
      } else {
        const newUser = {
          id: chara.discordID,
          key: profileId,
          collectedBeans: {},
          pity: 0
        };
        window.localStorage.setItem("username", profileId);
        store.setCurrentUser(newUser, profileJson[profileId]);
        props.toggleModal(false);
      }
    },
    {
      onlyOnce: true,
    }
  );
}
</script>

<template>
  <div :class="['modal', isOpen ? 'block' : 'hidden']">
    <div class="modal-content max-w-[600px] w-full flex flex-col gap-2 md:text-center">
      <div>
        Welcome!
        <br />
        <br />
        Nestled by the entrance of the store is a toy vending machine filled with what seems to be
        an endless supply of colorful capsules, along with a sign:
        <br />
        <br />
        <i>
          <span class="font-bold text-red">25 gald per roll.</span> Please speak to the cashier to
          exchange for a ticket. WARNING: Choking hazard. Adult supervision required!
        </i>
        <br />
        <br />
        <i>"Please spend in moderation."</i>
        <br />
        <br />
        The last message appears to be a newly added note. The toys inside have grown quite popular
        among certain residents, starting what is described to be a
        <i class="italics text-red">"gacha fever"</i>. While the owner of the machine is currently
        unavailable, one can speak to Greta (at the Lucky Toyshop) or Bullfrog (at the Trading Post)
        in order to purchase a ticket under their <b class="font-bold text-red">name</b>.
      </div>
      <form class="flex flex-col gap-2" @submit="(e) => setUser(e)">
        <label htmlFor="name">What is your name?</label>
        <input type="text" id="username" name="name" class="input" :value="store.currentUser?.key" />
        <input class="button" type="submit" value="Start!" />
        <span>{{ errorMessage }}</span>
      </form>
      <div class="footnote">
        All characters are part of the RP Group,
        <a href="https://galesend.twohoot.net/index.html" target="_blank" rel="noreferrer noopener">
          Gale's End
        </a>
        , used with permission.
      </div>
      <div class="footnote">Site and sprites made by Froggo, unless specified otherwise.</div>
      <div class="footnote">
        Inspired by
        <a href="https://finch.gay/frogs/" target="_blank" rel="noreferrer noopener"> Frogpon. </a>
      </div>
    </div>
  </div>
</template>
