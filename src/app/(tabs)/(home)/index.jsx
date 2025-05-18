import { observer } from "mobx-react-lite"
import { reactiveUserModel, reactiveModelQuizModel } from "../../../bootstrapping";
import Home from "../../../presenters/homePresenter";

export default observer(() => {
 return <Home userModel = {reactiveUserModel} quizModel = {reactiveModelQuizModel} ></Home>
});


