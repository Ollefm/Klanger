import { observer } from "mobx-react-lite"
import { QuizView } from "../views/quizView"
export const Quiz = observer(function QuizRender(props) {
    return (
        <QuizView/>
    )
})