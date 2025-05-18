import { observer } from "mobx-react-lite"
import { ProfileView } from "../views/profileView"
type ProfileProps = {
  userModel: {
    signOut: () => void;
    userData: any;
  };
};

export const Profile = observer(function ProfileRender(props: ProfileProps) {

  function handleSignoutACB(){
    props.userModel.signOut()
  }
    return (
        <ProfileView signOut = {handleSignoutACB} userData={props.userModel.userData}/>
    )
})