import { observer } from "mobx-react-lite"

import { reactiveModel } from "../../bootstrapping"
import { Recommend } from "../../presenters/recommendPresenter"

export default observer(function SearchPage() {
  return <Recommend model={reactiveModel} />
})
