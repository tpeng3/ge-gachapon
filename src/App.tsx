import React, { useState } from "react";
import "./App.css";
import Modal from "./Modal";
import Collection from "./Collection";
import Gachapon from "./Gachapon";
import Card from "./Card";
import useSystemStore from "./system";

function App() {
  const beanDict = useSystemStore((state) => state.beanDict);
  const currentUser = useSystemStore((state) => state.currentUser);
  const history = useSystemStore((state) => state.history);
  const [userHistory, toggleHistory] = useState(true);

  const getBannerText = () => {
    if (currentUser.key) {
      return `Welcome back, ${currentUser.key}`;
    } else {
      return `Hello!`;
    }
  };

  const getCardHistory = () => {
    return history
      .filter((i) => (userHistory ? i.user === currentUser.key : true))
      .sort((a, b) => b.timestamp - a.timestamp);
  };

  return (
    <div className="App">
      <div className="max-w-[800px] mx-auto">
        <div className="banner">{getBannerText()}</div>
        <Gachapon />
        <div className="cardtitle">
          Available Tickets: {currentUser.tickets ? currentUser.tickets : 0}
        </div>
        <div>
          <div className="flex flex-wrap gap-8 place-content-center">
            {getCardHistory().map((i, index) => (
              <Card key={index} bean={beanDict[i.key]} />
            ))}
          </div>
        </div>
      </div>
      <Modal />
      <Collection />
    </div>
  );
}

export default App;
