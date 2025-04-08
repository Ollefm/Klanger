import { observer } from "mobx-react-lite"
import { RecommendView } from "../views/recommendView"
import { SuggestionsView } from "../views/suggestionsView"
import { suggestConst } from "../suggestConst"
import { SafeAreaView } from "react-native"
export const Recommend = observer(function RecommendRender(props) {
    return (
        <>
        <RecommendView query={"hi"}/>
        <SuggestionsView searchResults={suggestConst}/>
        </>
    )
})