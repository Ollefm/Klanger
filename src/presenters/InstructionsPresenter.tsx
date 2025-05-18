import { observer } from "mobx-react-lite";
import InstructionView from "../views/instructionView";

export default observer(function InstructionRender(props) {

  function handleInitGame(){
    props.quizModel.initGame()
  }
  return (
    <InstructionView initGame = {handleInitGame}/>
  );
});