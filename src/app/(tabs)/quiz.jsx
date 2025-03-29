import { observer } from "mobx-react-lite"

import { reactiveModel } from "../../bootstrapping"
import { Quiz } from "../../presenters/quizPresenter"

export default observer(function SearchPage() {
  return <Quiz model={reactiveModel} />
})
