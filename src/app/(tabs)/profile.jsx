import { observer } from "mobx-react-lite"

import { reactiveUserModel } from "../../bootstrapping"
import { Profile } from "../../presenters/profilePresenter"

export default observer(() =>  {
  return <Profile userModel = {reactiveUserModel} />
})