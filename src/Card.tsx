import React from "react";
import useSystemStore from "./system";
import { motion } from "framer-motion";

function Card({ bean, index, isNew }) {
  const setSelectedBean = useSystemStore((state) => state.setSelectedBean);
  const pack =
    bean.pack === 1 ? "one" : bean.pack === 2 ? "two" : "two";

  return (
    <motion.button
      key={`button-${bean.key}`}
      animate={index === 0 && { opacity: [0.2, 1], scale: [0.2, 1] }}
      transition={index === 0 && { duration: 0.05, ease: "easeIn" }}
      whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
      className="card"
      onClick={() => setSelectedBean(bean)}
    >
      {isNew && <span className="new">NEW!</span>}
      <img
        src={require(`./images/${pack}/${bean.key}.png`)}
        className="w-32 pixellated"
      />
      <div className="font-display uppercase text-red font-bold text-[25px]">
        {bean.name}
      </div>
      <img
        src={require(`./images/star_one.png`)}
        className=" pixellated top-0 left-0 absolute scale-[2]"
      />
    </motion.button>
  );
}

export default Card;
