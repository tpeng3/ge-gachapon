import React from "react";
import "./App.css";
import Modal from "./Modal";
import Gachapon from "./Gachapon";
import Card from "./Card";
import useSystemStore from "./system";

function App() {
  const initBeanDict = useSystemStore((state) => state.initBeanDict);
  const updateHistory = useSystemStore((state) => state.updateQueue);
  const setRolls = useSystemStore((state) => state.setRolls);
  const currentUser = useSystemStore((state) => state.currentUser);

  return (
    <div className="App">
      <div className="container">
        <Gachapon />
        <div id="card-library-container">
          <div id="collection-container">
            <div id="total-frogs">2 / 165</div>
            <div id="saved-cards">
              <div className="card slide-card">
                <img
                  src="images/cards/snacklad.png"
                  alt="Card for Snack Lad. Description states, peak happiness +5 chip +10 snack"
                  tabIndex={0}
                />
              </div>
            </div>
          </div>
          <div id="card-library-content">
            {[0].map((i) => (
              <Card />
            ))}
          </div>
        </div>
      </div>
      <Modal />
    </div>
  );
}

export default App;
