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

const buttonStyle =
  "transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300";

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
    if (!name || isNaN(amount) || amount < 1 || amount > 1000) {
      setMessage("Invalid ticket form.");
      setTimeout(() => setMessage(""), 5000);
      return;
    }
    runTransaction(ref(db, "users/" + slugify(name)), (currentData) => {
      if (currentData) {
        currentData.tickets = parseInt(currentData.tickets) + parseInt(amount);
        return currentData;
      } else {
        return {
          key: slugify(name),
          tickets: amount,
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
    console.log(username, queue);
    if (!queue[username] || queue[username].tickets < 1) return <div></div>;
    return (
      <div key={username}>
        {username}
        {queue[username].tickets}
        <button
          key={username}
          className={buttonStyle}
          onClick={() => {
            setUser(username);
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
      <div className={`modal ${selectedUser !== "" ? "display" : "hidden"}`}>
        <div className="modal-content">
          <h1>{`Are you sure you want to remove all tickets for ${selectedUser}?`}</h1>
          <button className="button" onClick={() => removeTicket(selectedUser)}>
            Yes
          </button>
          <button className="button" onClick={() => setUser("")}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
