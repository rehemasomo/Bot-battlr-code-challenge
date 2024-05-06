import React from "react";

function YourBotArmy({ userArmy, releaseBot }) {
  return (
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
          <strong>Your Bot Army</strong>
        </div>
        {userArmy.map((bot) => (
          <div key={bot.id} className="column" onClick={() => releaseBot(bot)}>
            <img src={bot.avatar_url} alt="bot" />
            <span>{bot.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourBotArmy;
