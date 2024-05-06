
import React from "react";
import BotCard from "./BotCard";

function BotCollection({ bots, enlistBot, dischargeBot }) {
  return (
    <div className="ui four column grid">
      <div className="row">
        {bots.map((bot) => (
          <div key={bot.id} className="column">
            <BotCard bot={bot} enlistBot={enlistBot} />
            <button className="ui mini red button" onClick={() => dischargeBot(bot)}>
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BotCollection;
