import { observer } from "mobx-react-lite"

import { reactiveUserModel } from "../../bootstrapping"
import Leaderboard from "../../presenters/leaderboardPresenter"

export default observer(() => {
  return <Leaderboard userModel={reactiveUserModel} />
})
