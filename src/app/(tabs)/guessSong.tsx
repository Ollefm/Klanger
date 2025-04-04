import { observer } from "mobx-react-lite"
import { reactiveModel } from "../../bootstrapping"
import { GuessSongPresenter } from "../../presenters/guessSongPresenter"
import { useRouter } from 'expo-router';

export default observer(function SearchPage() {
  return (
  <GuessSongPresenter model = {reactiveModel}/>
)

})