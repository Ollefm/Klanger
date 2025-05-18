import { observer } from "mobx-react-lite"
import { reactiveModelQuizModel, reactiveUserModel } from "../../../bootstrapping"
import { GuessSongPresenter } from "../../../presenters/guessSongPresenter"

export default observer(() =>  {
  return (
  <GuessSongPresenter quizModel = {reactiveModelQuizModel} userModel = {reactiveUserModel}/>
)

})