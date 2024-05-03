import { getDatabase, ref, onValue } from "firebase/database";
import store from "./system";
import { slugify } from "./helpers";
import csvtojson from "csvtojson";
import { watch, watchEffect } from "vue";

function Listeners() {
  const currentUser = store.currentUser;

  watchEffect(() => {
    const db = getDatabase();

    // grab census data
    const CENSUS_URL =
      "https://docs.google.com/spreadsheets/d/1tOXcZD8jTv_vOW6XscLqpcc2asjxly-EpNGiAeiiEKc/export?format=csv&gid=0";
    store.updateCatalogue(JSON.parse(localStorage.getItem("census")));
    fetch(CENSUS_URL)
      .then((result) => result.text())
      .then(function (csvtext) {
        return csvtojson().fromString(csvtext);
      })
      .then(function (csv: any) {
        if (JSON.stringify(csv) !== localStorage.getItem("census")) {
          store.updateCatalogue(csv);
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
            store.initBeanDict(csv, data);
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
      if (data) store.updateHistory(Object.values(data));
    });
  });

  watch(currentUser, () => {
    if (!currentUser) return;
    const db = getDatabase();
    const userRef = ref(db, "queue/" + slugify(currentUser.key));
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) store.setCurrentUser(data);
    });
  });
}

export default Listeners;
