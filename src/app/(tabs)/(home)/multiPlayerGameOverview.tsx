import { observer } from "mobx-react-lite"
import { reactiveUserModel } from "../../../bootstrapping"
import MultiplayerGameOver from "../../../presenters/multiplayerGameOverviewPresenter"
export default observer(() =>  {
  return (
  <MultiplayerGameOver userModel = {reactiveUserModel}/>
)

})