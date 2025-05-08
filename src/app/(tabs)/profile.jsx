import { observer } from "mobx-react-lite"

import { reactiveModel } from "../../bootstrapping"
import { reactiveUserModel } from "../../bootstrapping"
import { Profile } from "../../presenters/profilePresenter"

export default observer(() =>  {
  return <Profile model={reactiveModel} userModel = {reactiveUserModel} />
})
