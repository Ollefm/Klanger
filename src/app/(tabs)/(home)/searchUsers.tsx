import SearchUsers from "../../../presenters/searchUsersPresenter"
import { observer } from "mobx-react-lite"
import { reactiveUserModel } from "../../../bootstrapping"

export default observer(() =>  {
  return (
  <SearchUsers userModel = {reactiveUserModel}/>
)

})