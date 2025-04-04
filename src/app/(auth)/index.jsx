import { reactiveModel } from "../../bootstrapping";
import { observer } from "mobx-react-lite"
import AuthStarting from "../../presenters/authStartingPresenter"

export default observer(function AuthStartingPage(){
  return(
    <AuthStarting model = {reactiveModel}></AuthStarting>
  )
})