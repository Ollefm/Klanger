import { reactiveModel } from "../../bootstrapping";
import { reactiveUserModel } from "../../bootstrapping";
import { observer } from "mobx-react-lite"
import RegisterRender from "../../presenters/registerPresenter"

export default observer(function RegisterPage(){
  return(
    <RegisterRender model = {reactiveModel} userModel = {reactiveUserModel}></RegisterRender>
  )
})