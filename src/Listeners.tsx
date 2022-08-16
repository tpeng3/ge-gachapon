import React from "react";
import { useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import useSystemStore from "./system";
import { slugify } from "./helpers";

function Listeners() {
  const initBeanDict = useSystemStore((state) => state.initBeanDict);
  const updateHistory = useSystemStore((state) => state.updateHistory);
  const setCurrentUser = useSystemStore((state) => state.setCurrentUser);
  const currentUser = useSystemStore((state) => state.currentUser);

  useEffect(() => {
    const db = getDatabase();
    // only update bean data on page load
    onValue(
      ref(db, "/beans"),
      (snapshot) => {
        const data = snapshot.val();
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
      if (data) updateHistory(Object.values(data));
    });
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const db = getDatabase();
    const userRef = ref(db, "queue/" + slugify(currentUser.key));
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setCurrentUser(data);
    });
  }, [currentUser]);

  return <div></div>;
}

export default Listeners;
