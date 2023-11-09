import React, { useState } from "react";
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
  const [isOpen, toggleModal] = useState(false);

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

  const renderTicketInfo = () => {
    if (completed) {
      return <span>&infin;</span>
    } else if (currentUser.specialTickets > 0) {
      return `Available Tickets: ${currentUser.specialTickets} (Special), ${currentUser.tickets} (Regular)`
    } else {
      return `Available Tickets: ${currentUser.tickets}`
    }
  }

  const getCardHistory = () => {
    return history
      .filter((i) => (userHistory ? i.user === currentUser.key : true))
      .sort((a, b) => b.timestamp - a.timestamp);
  };

  return Object.keys(beanDict).length > 0 && (
    <div className="App">
      <div className="max-w-[900px] mx-auto relative text-center">
        <div className="banner mb-4">
          <span className="bannertext">{getBannerText()}</span>
          <button
            className="buttontext uppercase mx-auto underline"
            onClick={() => toggleModal(true)}
          >
            Change user?
          </button>
        </div>
        <Gachapon toggleHistory={toggleHistory} completed={completed} />
        <div className="cardtitle mb-4">
          {renderTicketInfo()}
        </div>
        <button
          className="toggle-button md:absolute right-6 top-20"
          onClick={() => toggleHistory(!userHistory)}
        >
          {userHistory ? "See everyone's rolls" : "See your rolls"}
        </button>
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
      <Modal isOpen={isOpen} toggleModal={toggleModal} />
      <Collection />
    </div>
  );
}

export default App;
