import { observer } from "mobx-react-lite"
import { reactiveUserModel } from "../../../bootstrapping";
import Home from "../../../presenters/homePresenter";

export default observer(() => {
 return <Home userModel = {reactiveUserModel}></Home>
});


