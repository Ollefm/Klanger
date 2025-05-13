import { observer } from "mobx-react-lite";
import HomeView from "../views/homeView";

export default observer(function HomeRender(props) {

  function handleUpdateACB(){
    props.userModel.listenForChallenges();
  }
  return (
    <HomeView  challenges = {props.userModel.challenges} update = {handleUpdateACB}/>
 
  );
});