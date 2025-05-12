import { observer } from "mobx-react-lite"
import { reactiveModel } from "../../../bootstrapping"
import { GuessSongPresenter } from "../../../presenters/guessSongPresenter"

export default observer(() =>  {
  return (
  <GuessSongPresenter model = {reactiveModel}/>
)

})