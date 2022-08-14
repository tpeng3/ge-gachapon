import React from "react";

const rollBean = () => {
  console.log("generate random number");
};

function Card() {
  return (
    <div id="frogchine">
      <div className="click-me fadeout block">CLICK ME</div>
      <button className="machine" onClick={() => rollBean()}>
        <img
          src="https://galesend.twohoot.net/catalogue/assets/i_quingee.png"
          id="frogpon"
          className="bounce"
        />
      </button>
      <button id="switch-cards">See your collection</button>
    </div>
  );
}

export default Card;
