import { observer } from "mobx-react-lite"
import { reactiveModelQuizModel } from "../../../bootstrapping"
import InstructionsPresenter from "../../../presenters/InstructionsPresenter"

export default observer(() =>  {
  return (
  <InstructionsPresenter quizModel = {reactiveModelQuizModel}/>
)

})