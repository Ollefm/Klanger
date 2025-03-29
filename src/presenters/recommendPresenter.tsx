import { observer } from "mobx-react-lite"
import { RecommendView } from "../views/recommendView"
export const Recommend = observer(function RecommendRender(props) {
    return (
        <RecommendView/>
    )
})