import SearchUsers from "../../presenters/searchUsersPresenter"
import { observer } from "mobx-react-lite"
import { reactiveModel } from "../../bootstrapping"

export default observer(() =>  {
  return (
  <SearchUsers model = {reactiveModel}/>
)

})