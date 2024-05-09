import React, { useState, useEffect } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import SortBar from "./SortBar";

function BotsPage() {
  const [bots, setBots] = useState([]);
  const [userArmy, setUserArmy] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:3000/bots")
      .then((res) => res.json())
      .then((data) => setBots(data))
      .catch((err) => console.error("Error fetching bots:", err));
  }, []);

  const enlistBot = (bot) => {
    if (!userArmy.some((b) => b.id === bot.id)) {
      setUserArmy([...userArmy, bot]);
    }
  };

  const releaseBot = (bot) => {
    setUserArmy(userArmy.filter((b) => b.id !== bot.id));
  };
// eslint-disable-next-line
  const dischargeBot = (bot) => {
    setUserArmy(userArmy.filter((b) => b.id !== bot.id));
  
    fetch("http://localhost:3000/bots", {
      method: "DELETE"
    })
    .then(response => {
      if (response.ok) {
        console.log("Bot successfully discharged from the backend.");

        setUserArmy(prevUserArmy => prevUserArmy.filter((b) => b.id !== bot.id));
      } else {
        console.error("Failed to discharge bot from the backend:", response.statusText);
      }
    })
    .catch(error => {
      console.error("Failed to discharge bot from the backend:", error);
    });
  };
  //sorting 
  const handleSort = (sortBy) => {
    const sortedBots = [...bots];
  
    sortedBots.sort((a, b) => {

      if (sortBy === 'health') {
        return b.health - a.health; 
      } else if (sortBy === 'damage') {
        return b.damage - a.damage; 
      } else if (sortBy === 'armor') {
        return b.armor - a.armor; 
      }
      return 0; // Default 
    });
  
    // Update
    setBots(sortedBots);
  };
  
  
  return (
    <div>
      <SortBar handleSort={handleSort} />
      <YourBotArmy userArmy={userArmy} releaseBot={releaseBot} />
      <BotCollection bots={bots} enlistBot={enlistBot} dischargeBot={dischargeBot} />
    </div>
  );
}

export default BotsPage;
