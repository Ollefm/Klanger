import NewGame from "../../../presenters/newGamePresenter"
import { observer } from "mobx-react-lite"
import { reactiveUserModel, reactiveModelQuizModel } from "../../../bootstrapping"

export default observer(() =>  {
  return (
  <NewGame userModel = {reactiveUserModel} quizModel = {reactiveModelQuizModel}/>
)

})