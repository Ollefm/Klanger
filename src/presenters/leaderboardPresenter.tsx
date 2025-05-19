import { observer } from "mobx-react-lite";
import { LeaderboardView } from "../views/leaderboardView";

type LeaderboardProps = {
  userModel: {
    leaderboard: any;
    getLeaderboard: () => void;
  };
};

export default observer(function Leaderboard(props: LeaderboardProps) {
  return (
    <LeaderboardView
      title={"Rock"}
      leaderBoardData={props.userModel.leaderboard}
      update={handleUpdateACB}
    />
  );
  function handleUpdateACB() {
     props.userModel.getLeaderboard();
  }
});
