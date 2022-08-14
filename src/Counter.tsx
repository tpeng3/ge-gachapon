import React from "react";
import { useState, useEffect } from "react";
import { getDatabase, ref, set, remove, onValue } from "firebase/database";
import { slugify } from "./helpers";

const buttonStyle =
  "transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300";

const Counter = () => {
  const [errorMessage, setMessage] = useState("");
  const [showModal, toggleModal] = useState(false);
  const [selectedUser, setUser] = useState("");
  const [queue, setQueue] = useState({});

  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, "queue/");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      data ? setQueue(data) : setQueue({});
    });
  }, []);

  const processTicket = (e) => {
    e.preventDefault(); // prevent page refresh
    const db = getDatabase();
    const name = e.target[0].value;
    const added = e.target[1].value || 1;
    const amount = queue[slugify(name)]
      ? parseInt(queue[slugify(name)]) + added
      : added;
    if (!name || isNaN(amount) || amount < 1 || amount > 1000) {
      setMessage("Invalid ticket form.");
      setTimeout(() => setMessage(""), 5000);
      return;
    }
    set(ref(db, "queue/" + slugify(name)), amount);
  };

  const removeTicket = (username) => {
    const db = getDatabase();
    remove(ref(db, "queue/" + slugify(username)));
    toggleModal(false);
  };

  const renderQueueTicket = (username) => {
    return (
      <div key={username}>
        {username}
        {queue[username]}
        <button
          className={buttonStyle}
          onClick={() => {
            setUser(username);
            toggleModal(true);
          }}
        >
          Remove
        </button>
      </div>
    );
  };

  return (
    <div>
      <h1>Add Ticket</h1>
      <form onSubmit={(e) => processTicket(e)}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="amount">{`Ticket amount`}</label>
        <input type="number" id="amount" name="amount" placeholder="1" />
        <input className={buttonStyle} type="submit" value="Submit" />
      </form>
      {/* Error Message */}
      <div>{errorMessage}</div>

      <h1>View Queue</h1>
      {/* can remove people in queue */}
      {Object.keys(queue).map((i) => renderQueueTicket(i))}
      {/* Confirmation modal */}
      <div className={`${showModal ? "modal-show" : "modal-hidden"}`}>
        {`Are you sure you want to remove all tickets for ${selectedUser}?`}
        <button onClick={() => removeTicket(selectedUser)}>Yes</button>
        <button onClick={() => toggleModal(false)}>No</button>
      </div>
    </div>
  );
};

export default Counter;
