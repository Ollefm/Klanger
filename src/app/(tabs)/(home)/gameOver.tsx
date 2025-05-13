import { observer } from "mobx-react-lite"

import { GameOverPresenter } from "../../../presenters/gameOverPresenter"

export default observer(() =>  {
  return (
  <GameOverPresenter 
    score={0} 
    correctGuesses={0} 
    totalRounds={0} 
  />
)

})