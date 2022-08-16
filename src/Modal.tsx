import React from "react";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { slugify } from "./helpers";
import useSystemStore from "./system";

function Modal() {
  const [isOpen, toggleModal] = useState(false);
  const [errorMessage, setMessage] = useState("");
  const setCurrentUser = useSystemStore((state) => state.setCurrentUser);

  useEffect(() => {
    const savedname = window.localStorage.getItem("username");
    if (savedname) {
      const db = getDatabase();
      onValue(
        ref(db, `/users/${slugify(savedname)}`),
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setCurrentUser(data);
            toggleModal(false);
          } else {
            toggleModal(true);
          }
        },
        {
          onlyOnce: true,
        }
      );
    } else {
      toggleModal(true);
    }
  }, []);

  const updateError = (msg) => {
    setMessage(msg);
  };

  const setUser = (e) => {
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
          toggleModal(false);
        } else {
          updateError(
            "Sorry, this name hasn't been registered yet. Please check with a cashier!"
          );
        }
      },
      {
        onlyOnce: true,
      }
    );
  };

  return (
    <div className={`modal ${isOpen ? "block" : "hidden"}`}>
      <div className="modal-content max-w-[600px] flex flex-col gap-2">
        <div className="">Welcome to the Lucky Toyshop!</div>
        <div className="">
          The windchimes shimmer as the door swings open to reveal a modest
          arrangement of books, toys and other small gadgets neatly displayed
          across multiple ornate shelves. Nestled by the entrance is an odd
          egg-shaped and half-translucent contraption filled to a seemingly
          endless supply of colorful capsules, along with a sign:
          <br />
          <br />"<strong>25 gald per roll.</strong> Please speak to the cashier
          to exchange for a ticket. WARNING: Choking hazard. Adult supervision
          required!"
          <br />
          <br />
          An employee (whether it's Cynn or Greta) politely greets the customer
          as they step up to the counter. In order to register their ticket,
          they need to provide a <strong>name</strong>.
        </div>
        <form className="flex flex-col gap-2" onSubmit={(e) => setUser(e)}>
          <label htmlFor="name">What's your name?</label>
          <input type="text" id="username" name="name" className="input" />
          <input className="button" type="submit" value="Start!" />
          <span>{errorMessage}</span>
        </form>
        <div className="footnote">
          All characters are part of the RP Group,{" "}
          <a href="https://galesend.twohoot.net/index.html" target="_blank">
            Gale's End
          </a>
          , used with permission.
        </div>
        <div className="footnote">Site and sprites made by Froggo.</div>
        <div className="footnote">
          Inspired by{" "}
          <a href="https://finch.gay/frogs/" target="_blank">
            Frogpon.
          </a>
        </div>
      </div>
    </div>
  );
}

export default Modal;
