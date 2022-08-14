import React from "react";
import { useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import useSystemStore from "./system";
import { slugify } from "./helpers";

function Listeners() {
  const initBeanDict = useSystemStore((state) => state.initBeanDict);
  const updateHistory = useSystemStore((state) => state.updateQueue);
  const setRolls = useSystemStore((state) => state.setRolls);
  const currentUser = useSystemStore((state) => state.currentUser);

  useEffect(() => {
    const db = getDatabase();
    // only update bean data on page load
    onValue(
      ref(db, "/beans"),
      (snapshot) => {
        const data = snapshot.val();
        console.log("beandata", data);
        initBeanDict(data);
      },
      {
        onlyOnce: true,
      }
    );

    // listen to when history data updates (other people roll)
    const historyRef = ref(db, "history/");
    onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data, "historyref");
      updateHistory(data);
    });
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const db = getDatabase();
    const userRef = ref(db, "queue/" + slugify(currentUser));
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data, "queuerefffff");
      if (data) setRolls(data);
    });
  }, [currentUser]);

  return <div></div>;
}

export default Listeners;
