import { observer } from "mobx-react-lite";
import { ProfileView } from "../views/profileView";
type ProfileProps = {
  userModel: {
    signOut: () => void;
    userData: any;
    totalScore: number;
    gamesPlayed: number;
  };
};

export const Profile = observer(function ProfileRender(props: ProfileProps) {
  return (
    <ProfileView
      signOut={handleSignoutACB}
      score ={props.userModel.totalScore}
      gamesPlayed={props.userModel.gamesPlayed}
      userData={props.userModel.userData}
    />
  );
  function handleSignoutACB() {
    props.userModel.signOut();
  }

});
