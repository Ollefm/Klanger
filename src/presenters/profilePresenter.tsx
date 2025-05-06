import { observer } from "mobx-react-lite"
import { ProfileView } from "../views/profileView"
export const Profile = observer(function ProfileRender(props) {
    console.log(props.model.user)
    return (
        <ProfileView username={props.model.user.username}/>
    )
})