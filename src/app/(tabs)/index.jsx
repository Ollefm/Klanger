import { observer } from "mobx-react-lite"
import { reactiveModel } from "../../bootstrapping";
import Home from "../../presenters/homePresenter";

export default observer(() => {
 return <Home model = {reactiveModel}></Home>
});


