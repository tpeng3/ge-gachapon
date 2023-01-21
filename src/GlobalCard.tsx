import React from "react";
import { motion } from "framer-motion";

function GlobalCard({ bean, index, user }) {
  const pack = bean.pack;

  return (
    <motion.div
      key={`button-${bean.key}`}
      animate={index === 0 && { opacity: [0.2, 1], scale: [0.2, 1] }}
      transition={index === 0 && { duration: 0.05, ease: "easeIn" }}
      className="global-card"
    >
      <img
        src={require(`./images/${pack}/${bean.key}.png`)}
        className="w-32 pixellated"
      />
      <div className="font-display uppercase text-red font-bold text-[25px]"></div>
      <div className="font-display uppercase text-red font-bold text-[25px]">
        Rolled by
        <br />
        {user}
      </div>
      <img
        src={require(`./images/star_one.png`)}
        className=" pixellated top-0 left-0 absolute scale-[2]"
      />
    </motion.div>
  );
}

export default GlobalCard;
