import React from "react";
import useSystemStore from "./system";

function Modal() {
  const setSelectedBean = useSystemStore((state) => state.setSelectedBean);
  const selectedBean = useSystemStore((state) => state.selectedBean);
  const currentUser = useSystemStore((state) => state.currentUser);
  const sortedBeans = useSystemStore((state) => state.sortedBeans);

  const calculateBeanCount = () => {
    const total = sortedBeans.length;
    const current = sortedBeans.filter(
      (i) => currentUser?.collectedBeans && currentUser.collectedBeans[i.key]
    ).length;
    return `(${current} / ${total})`;
  };

  const renderCollectionCard = (bean) => {
    const rarity =
      bean.rarity === 1 ? "one" : bean.rarity === 3 ? "three" : "five";
    const collected =
      currentUser?.collectedBeans && currentUser?.collectedBeans[bean.key];

    if (collected) {
      return (
        <button
          key={"col" + bean.key}
          className="card"
          onClick={() => setSelectedBean(bean)}
        >
          <img
            src={require(`../images/${rarity}/${bean.key}.png`)}
            className="w-20 pixellated"
          />
          <div className="font-display uppercase text-red font-bold text-[25px]">
            {bean.name}
          </div>
          <img
            src={require(`../images/star_${rarity}.png`)}
            className=" pixellated top-0 left-0 absolute scale-[1.5]"
          />
        </button>
      );
    } else {
      return (
        <div key={"col" + bean.key} className="blank-card">
          <img
            src={require(`../images/${rarity}/${bean.key}.png`)}
            className="w-20 pixellated brightness-0"
          />
          <div className="font-display uppercase font-bold text-[25px]">
            ???
          </div>
          <img
            src={require(`../images/star_${rarity}.png`)}
            className="pixellated top-0 left-0 brightness-50 absolute scale-[1.5]"
          />
        </div>
      );
    }
  };

  const showSelectedBean = () => {
    const bean = selectedBean;
    // TODO: im lazy, make a helper function for this later
    const rarity =
      bean.rarity === 1 ? "one" : bean.rarity === 3 ? "three" : "five";
    return (
      <div className="relative">
        <img
          src={require(`../images/${rarity}/${bean.key}.png`)}
          className="w-64 pixellated"
        />
        <img
          src={require(`../images/star_${rarity}.png`)}
          className="pixellated top-0 left-0 absolute scale-[2] top-2"
        />
        <div className="cardtitle">{bean.name}</div>
        <div className="cardtitle">Belongs to {bean.mun}</div>
        <div className="cardtitle">
          Found {currentUser?.collectedBeans[bean.key]} times
        </div>
        {/* TODO: do... something with this button... idk maybe link app */}
        {/* <button className="button">Save Bean</button> */}
      </div>
    );
  };

  return (
    <div className={`modal ${selectedBean ? "block" : "hidden"}`}>
      <div
        className="w-full h-full"
        onClick={() => setSelectedBean(null)}
      ></div>
      <div className="modal-content w-full max-w-[800px] flex flex-col gap-2">
        <button
          className="absolute top-1 right-4 p-2 cursor-pointer text-2xl hover:text-red"
          onClick={() => setSelectedBean(null)}
        >
          X
        </button>
        <div className="uppercase font-display font-bold text-3xl">
          Collected Beans {sortedBeans && calculateBeanCount()}
        </div>
        <div className="flex gap-10">
          <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[500px] justify-center py-[5px]">
            {sortedBeans.map((i) => renderCollectionCard(i))}
          </div>
          <div className="min-w-[40%] border-[3px] border-pink rounded-xl p-4">
            {selectedBean && showSelectedBean()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
