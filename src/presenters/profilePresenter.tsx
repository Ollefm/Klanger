import { observer } from "mobx-react-lite"
import { ProfileView } from "../views/profileView"
export const Profile = observer(function ProfileRender(props) {

  function handleSignoutACB(){
    props.userModel.signOut()
  }
    return (
        <ProfileView signOut = {handleSignoutACB} userData={props.userModel.userData}/>
    )
})