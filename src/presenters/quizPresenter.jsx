import { observer } from "mobx-react-lite"
import { QuizView } from "../views/quizView"

export const Quiz = observer(function QuizRender(props) {

    function currentTrackIdHandlerACB(){
        props.model.setCurrentTrackId("3135556")
    }

    function PlaySoundHandler(){
        props.model.playSound()
    }
    return (
        <QuizView model = {props.model} playSound={PlaySoundHandler} setTrack = {currentTrackIdHandlerACB}/>
    )
})