import { observer } from "mobx-react-lite"

import { reactiveModel } from "../../bootstrapping"
import Leaderboard from "../../presenters/leaderboardPresenter"

export default observer(() => {
  return <Leaderboard model={reactiveModel} />
})
