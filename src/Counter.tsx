import React from "react";
import { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  runTransaction,
  set,
  onValue,
} from "firebase/database";
import { slugify } from "./helpers";

const Counter = () => {
  const [errorMessage, setMessage] = useState("");
  const [selectedUser, setUser] = useState("");
  const [queue, setQueue] = useState({});

  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      data ? setQueue(data) : setQueue({});
    });
  }, []);

  const processTicket = (e) => {
    e.preventDefault(); // prevent page refresh
    const db = getDatabase();
    const name = e.target[0].value;
    const amount = e.target[1].value || 1;
    const isSpecial = e.target[2].value || false;
    if (!name || isNaN(amount) || amount < 1 || amount > 1000) {
      setMessage("Invalid ticket form.");
      setTimeout(() => setMessage(""), 5000);
      return;
    }
    runTransaction(ref(db, "users/" + slugify(name)), (currentData) => {
      if (currentData) {
        if (isSpecial) {
          currentData.specialTickets = parseInt(currentData.specialTickets) + parseInt(amount);
        } else {
          currentData.tickets = parseInt(currentData.tickets) + parseInt(amount);
        }
        setMessage(`Added ${amount} tickets to ${name}!`);
        setTimeout(() => setMessage(""), 5000);
        return currentData;
      } else {
        return {
          key: slugify(name),
          ...isSpecial ? {specialTickets: amount, tickets: 0} : {tickets: amount, specialTickets: 0}
          // collectedBeans: {} add in another transaction
        };
      }
    });
  };

  const removeTicket = (username) => {
    const db = getDatabase();
    set(ref(db, `users/${slugify(username)}/tickets`), 0);
    setUser("");
  };

  const renderQueueTicket = (username) => {
    if (!queue[username]) return <div></div>;
    return (
      <div key={username} className="grid grid-cols-4 items-center">
        <span>{username}</span>
        <div>{queue[username].tickets}</div>
        <div>{queue[username].specialTickets}</div>
        <button
          key={username}
          className="border-2 border-red rounded-lg hover:bg-red"
          onClick={() => {
            setUser(username);
          }}
        >
          Reset
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-[800px] w-full h-full mx-auto text-center">
      <form
        className="rounded-lg bg-beige border-2 border-red p-10 m-10 flex flex-col gap-8"
        onSubmit={(e) => processTicket(e)}
      >
        <h1 className="cardtitle">Add Ticket</h1>
        <div className="md:ml-[56px]">
          <label className="mr-8 md:text-right" htmlFor="name">
            Name
          </label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label
            className="mr-8 md:text-right"
            htmlFor="amount"
          >{`Ticket amount`}</label>
          <input type="number" id="amount" name="amount" placeholder="1" />
        </div>
        <div>
          <label
            className="mr-8 md:text-right"
            htmlFor="amount"
          >{`Special ticket?`}</label>
          <input type="checkbox" id="special" name="special" />
        </div>
        <input className="toggle-button" type="submit" value="Submit" />
        {/* Error Message */}
        <div className="text-red">{errorMessage}</div>
      </form>

      <div className="rounded-lg bg-beige border-2 border-red p-10 m-10 flex flex-col gap-2">
        <h1 className="cardtitle">Current Users</h1>
        <div className="grid grid-cols-4">
          <span>Username</span>
          <span>Ticket</span>
          <span>Special Ticket</span>
          <span>Reset?</span>
        </div>
        {/* can remove people in queue */}
        {Object.keys(queue).map((i) => renderQueueTicket(i))}
        {/* Confirmation modal */}
        <div className={`modal ${selectedUser !== "" ? "display" : "hidden"}`}>
          <div className="modal-content">
            <h1>{`Are you sure you want to remove all tickets for ${selectedUser}?`}</h1>
            <button
              className="button mr-6"
              onClick={() => removeTicket(selectedUser)}
            >
              Yes
            </button>
            <button className="button" onClick={() => setUser("")}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
