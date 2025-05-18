import { observer } from "mobx-react-lite"
import { reactiveModelQuizModel } from "../../../bootstrapping"
import { GameOverPresenter } from "../../../presenters/gameOverPresenter"

export default observer(() =>  {
  return (
  <GameOverPresenter 
    quizModel = {reactiveModelQuizModel}
  />
)

})