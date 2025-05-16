import { observer } from "mobx-react-lite";
import { LeaderboardView } from "../views/leaderboardView";
export default observer(function Leaderboard(props) {
  const leaderBoard1 = {
    genre: "Rock",
    gamemode: "guessSong",
    data: [
      { userName: "Bob", highScore: 52 },
      { userName: "I<3CLASSICAL", highScore: 111 },
      { userName: "CrzyFrg", highScore: 99 },
      { userName: "Kl4ngrB4ngr", highScore: 126 },
      { userName: "CTReePeo", highScore: 123 },
    ],
  };
  const leaderBoard2 = {
    genre: "POP",
    gamemode: "guessSong",
    data: [
      { userName: "Bob", highScore: 0 },
      { userName: "I<3CLASSICAL", highScore: 23 },
      { userName: "CrzyFrg", highScore: 9001 },
      { userName: "Kl4ngrB4ngr", highScore: 13 },
      { userName: "CTReePeo", highScore: 77 },
    ],
  };

  const leaderBoards = [leaderBoard1];

  return <LeaderboardView leaderBoard={leaderBoard1} />;
});
