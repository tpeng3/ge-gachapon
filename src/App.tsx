import React, { useState } from "react";
import "./App.css";
import Modal from "./Modal";
import Collection from "./Collection";
import Gachapon from "./Gachapon";
import Card from "./Card";
import GlobalCard from "./GlobalCard";
import useSystemStore from "./system";
import { motion } from "framer-motion";

function App() {
  const beanDict = useSystemStore((state) => state.beanDict);
  const currentUser = useSystemStore((state) => state.currentUser);
  const history = useSystemStore((state) => state.history);
  const [userHistory, toggleHistory] = useState(true);
  const sortedBeans = useSystemStore((state) => state.sortedBeans);
  const completed =
    sortedBeans.length ===
    sortedBeans.filter(
      (i) => currentUser?.collectedBeans && currentUser.collectedBeans[i.key]
    ).length;

  const variants = {
    open: {
      x: [-50, 0],
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 0.5,
      },
    },
    closed: {
      x: [50, 0],
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 0.5,
      },
    },
  };

  const getBannerText = () => {
    if (completed) {
      return `Congrats ${currentUser.key} on getting all the beans!`;
    } else if (currentUser.key) {
      return `Hi ${currentUser.key}!`;
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
      <div className="max-w-[900px] mx-auto relative">
        <button
          className="toggle-button absolute right-6 top-20"
          onClick={() => toggleHistory(!userHistory)}
        >
          {userHistory ? "See everyone's rolls" : "See your rolls"}
        </button>
        <div className="banner">{getBannerText()}</div>
        <Gachapon toggleHistory={toggleHistory} completed={completed} />
        <div className="cardtitle">
          Available Tickets:{" "}
          {completed ? (
            <span>&infin;</span>
          ) : currentUser.tickets ? (
            currentUser.tickets
          ) : (
            0
          )}
        </div>
        <div className="transparent-clip h-[500px] overflow-auto">
          <motion.div
            animate={userHistory ? "open" : "closed"}
            variants={variants}
            className="p-4 flex flex-wrap gap-8 place-content-center"
          >
            {getCardHistory()
              .slice(0, 100)
              .map((i, index) =>
                userHistory ? (
                  <Card
                    key={index}
                    index={index}
                    bean={beanDict[i.key]}
                    isNew={i.isNew}
                  />
                ) : (
                  <GlobalCard
                    key={index}
                    index={index}
                    bean={beanDict[i.key]}
                    user={i.user}
                  />
                )
              )}
          </motion.div>
        </div>
      </div>
      <Modal />
      <Collection />
    </div>
  );
}

export default App;
