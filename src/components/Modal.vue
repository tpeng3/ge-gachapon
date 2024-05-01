<script setup lang="ts">
import { ref as vRef, watchEffect } from "vue";
import { getDatabase, ref, onValue } from "firebase/database";
import { slugify } from "../helpers";
import useSystemStore from "../system";

const props = defineProps<{ isOpen: boolean; toggleModal: Function }>();
const errorMessage = vRef("");
const setCurrentUser = useSystemStore((state) => state.setCurrentUser);

watchEffect(() => {
  const savedname = window.localStorage.getItem("username");
  if (savedname) {
    const db = getDatabase();
    onValue(
      ref(db, `/users/${slugify(savedname)}`),
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setCurrentUser(data);
          props.toggleModal(false);
        } else {
          props.toggleModal(true);
        }
      },
      {
        onlyOnce: true,
      }
    );
  } else {
    props.toggleModal(true);
  }
});

const updateError = (msg: string) => {
  errorMessage.value = msg;
};

const setUser = (e: any) => {
  e.preventDefault(); // prevent page refresh
  const name = e.target[0].value;
  if (!name) return updateError("Name can't be empty.");
  const db = getDatabase();
  onValue(
    ref(db, `/users/${slugify(name)}`),
    (snapshot) => {
      const data = snapshot.val();
      if (data) {
        window.localStorage.setItem("username", slugify(name));
        setCurrentUser(data);
        props.toggleModal(false);
      } else {
        updateError("Sorry, this name hasn't been registered yet. Please check with a cashier!");
      }
    },
    {
      onlyOnce: true,
    }
  );
};
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
        in order to purchase a ticket under their<span class="font-bold text-red">name</span>.
      </div>
      <form class="flex flex-col gap-2" @submit="(e) => setUser(e)">
        <label htmlFor="name">What is your name?</label>
        <input type="text" id="username" name="name" class="input" />
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
