import React from "react";
import { useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import useSystemStore from "./system";
import { slugify } from "./helpers";
import csvtojson from "csvtojson";
import WebFont from "webfontloader";

function Listeners() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Amatic SC", "Lato"],
      },
    });
  }, []);

  const initBeanDict = useSystemStore((state) => state.initBeanDict);
  const updateHistory = useSystemStore((state) => state.updateHistory);
  const setCurrentUser = useSystemStore((state) => state.setCurrentUser);
  const currentUser = useSystemStore((state) => state.currentUser);
  const updateCatalogue = useSystemStore((state) => state.updateCatalogue);

  useEffect(() => {
    const db = getDatabase();

    // grab census data
    const CENSUS_URL =
      "https://docs.google.com/spreadsheets/d/1tOXcZD8jTv_vOW6XscLqpcc2asjxly-EpNGiAeiiEKc/export?format=csv&gid=0";
    updateCatalogue(JSON.parse(localStorage.getItem("census")));
    fetch(CENSUS_URL)
      .then((result) => result.text())
      .then(function (csvtext) {
        return csvtojson().fromString(csvtext);
      })
      .then(function (csv) {
        if (JSON.stringify(csv) !== localStorage.getItem("census")) {
          updateCatalogue(csv);
          localStorage.setItem("census", JSON.stringify(csv));
        }
      });

    const BEAN_URL =
      "https://docs.google.com/spreadsheets/d/1CXvlhH7D-3do11qZXQbJj7L7dZdMVB8q7WFEJkHvtcI/export?format=csv&gid=1332276337";
    fetch(BEAN_URL)
      .then((result) => result.text())
      .then(function (csvtext) {
        return csvtojson().fromString(csvtext);
      })
      .then(function (csv) {
        // only update bean data on page load
        onValue(
          ref(db, "/beans"),
          (snapshot) => {
            const data = snapshot.val();
            initBeanDict(csv, data);
          },
          {
            onlyOnce: true,
          }
        );
      });

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
