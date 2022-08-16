import React from "react";
import useSystemStore from "./system";

function Card({ bean }) {
  const setSelectedBean = useSystemStore((state) => state.setSelectedBean);
  const rarity =
    bean.rarity === 1 ? "one" : bean.rarity === 3 ? "three" : "five";

  return (
    <button className="card" onClick={() => setSelectedBean(bean)}>
      <img
        src={require(`../images/${rarity}/${bean.key}.png`)}
        className="w-32 pixellated"
      />
      <div className="font-display uppercase text-red font-bold text-[25px]">
        {bean.name}
      </div>
      <img
        src={require(`../images/star_${rarity}.png`)}
        className=" pixellated top-0 left-0 absolute scale-[2]"
      />
    </button>
  );
}

export default Card;
