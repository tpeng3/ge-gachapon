import React from "react";
import useSystemStore from "./system";

function Modal() {
  const setSelectedBean = useSystemStore((state) => state.setSelectedBean);
  const selectedBean = useSystemStore((state) => state.selectedBean);
  const currentUser = useSystemStore((state) => state.currentUser);
  const sortedBeans = useSystemStore((state) => state.sortedBeans);
  const censusData = useSystemStore((state) => state.censusData);

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

  const findAppLink = () => {
    const data = censusData.find((i) => i.IdNUM == selectedBean.idnum);
    return data && data.appurl;
  };

  const calculateBeanCount = () => {
    const total = sortedBeans.length;
    const current = sortedBeans.filter(
      (i) => currentUser?.collectedBeans && currentUser.collectedBeans[i.key]
    ).length;
    return `(${current} / ${total})`;
  };

  const renderCollectionCard = (bean) => {
    const pack =
      bean.pack === 1 ? "one" : bean.pack === 2 ? "two" : "two";
    const collected =
      currentUser?.collectedBeans && currentUser?.collectedBeans[bean.key];

    if (collected) {
      return (
        <button
          key={"col" + bean.key}
          className={`card ${
            selectedBean && selectedBean.key === bean.key ? "bg-rose" : ""
          }`}
          id={bean.key}
          onClick={() => setSelectedBean(bean)}
        >
          <img
            src={require(`./images/${pack}/${bean.key}.png`)}
            className="w-[5rem] md:w-[6rem] pixellated"
          />
          <div className="font-display uppercase text-red font-bold text-[25px]">
            {bean.name}
          </div>
          <img
            src={require(`./images/star_one.png`)}
            className=" pixellated top-0 left-0 absolute scale-[1.5]"
          />
        </button>
      );
    } else {
      return (
        <div key={"col" + bean.key} className="blank-card">
          <img
            src={require(`./images/${pack}/${bean.key}.png`)}
            className="w-[6rem] pixellated brightness-0"
          />
          <div className="font-display uppercase font-bold text-[25px]">
            ???
          </div>
          <img
            src={require(`./images/star_one.png`)}
            className="pixellated top-0 left-0 brightness-50 absolute scale-[1.5]"
          />
        </div>
      );
    }
  };

  const showSelectedBean = () => {
    const bean = selectedBean;
    const pack =
      bean.pack === 1 ? "one" : bean.pack === 2 ? "two" : "two";
    return (
      <div className="relative pb-4 flex flex-col items-center">
        <img
          src={require(`./images/${pack}/${bean.key}.png`)}
          className="w-32 md:w-64 pixellated"
        />
        <img
          src={require(`./images/star_one.png`)}
          className="pixellated top-0 left-0 absolute scale-[2] top-2"
        />
        <div className="cardtitle">{bean.name}</div>
        <div className="cardtitle">Belongs to {bean.mun}</div>
        <div className="cardtitle mb-4">
          {currentUser?.collectedBeans[bean.key] &&
            `Found ${currentUser?.collectedBeans[bean.key]} times`}
        </div>
        {bean.idnum > 0 && <a
          target="_blank"
          rel="noreferrer noopener"
          className="toggle-button"
          href={findAppLink()}
        >
          View Link
        </a>}
        {bean.artist && (
          <span className="footnote absolute top-0 right-0">
            Contributed by {bean.artist}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={`modal ${selectedBean ? "block" : "hidden"}`}>
      <div
        className="w-full h-full"
        onClick={() => setSelectedBean(null)}
      ></div>
      <div className="modal-content w-full max-w-[900px] flex flex-col gap-2 max-h-screen">
        <button
          className="absolute top-1 right-4 p-2 cursor-pointer text-2xl hover:text-red"
          onClick={() => setSelectedBean(null)}
        >
          X
        </button>
        <div className="uppercase font-display font-bold text-3xl">
          Collected Beans {sortedBeans && calculateBeanCount()}
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-10 overflow-hidden">
          <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[500px] justify-center py-[5px]">
            {sortedBeans.map((i) => renderCollectionCard(i))}
          </div>
          <div className="min-w-[200px] h-fit border-[3px] border-pink rounded-xl p-4">
            {selectedBean && showSelectedBean()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
