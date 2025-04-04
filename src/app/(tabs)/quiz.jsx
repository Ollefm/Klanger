import { observer } from "mobx-react-lite"
import { reactiveModel } from "../../bootstrapping"
import { Quiz } from "../../presenters/quizPresenter"
import { GuessSongPresenter } from "../../presenters/guessSongPresenter"
import { useRouter } from 'expo-router';


export default observer(function SearchPage() {
  const router = useRouter();
  function goToGuessCB(){
    router.navigate('/guessSong')
  }

  return (
  <>
  <Quiz startgame = {goToGuessCB }model = {reactiveModel}/>
  </>  
)

})
