import { getDatabase, ref, onValue } from "firebase/database";
import store from "./system";
import csvtojson from "csvtojson";

function Listeners() {
  const db = getDatabase();

  // grab census data
  const CENSUS_URL =
    "https://docs.google.com/spreadsheets/d/1x78IkYaoxkCZf10HBkRGYlE9lIT1mkFvMAXgtNq89S0/export?format=csv&gid=1195434871";
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

  // grab bean data
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
  const historyRef = ref(db, "/history/");
  onValue(historyRef, (snapshot) => {
    const data = snapshot.val();
    if (data) store.updateHistory(Object.values(data));
  });
}

export default Listeners;
