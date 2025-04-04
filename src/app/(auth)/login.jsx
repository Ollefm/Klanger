import { reactiveModel } from "../../bootstrapping";
import { observer } from "mobx-react-lite"
import LoginRender from "../../presenters/loginPresenter"

export default observer(function LoginPage(){
  return(
    <LoginRender model = {reactiveModel}></LoginRender>
  )
})