import NewGameView from "../../../views/newGameView"
import { observer } from "mobx-react-lite"
import { reactiveUserModel } from "../../../bootstrapping"

export default observer(() =>  {
  return (
  <NewGameView userModel = {reactiveUserModel}/>
)

})