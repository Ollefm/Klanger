import { observer } from "mobx-react-lite";
import { reactiveModel } from "../../bootstrapping";
import { Quiz } from "../../presenters/quizPresenter";
import { useRouter } from "expo-router";

export default observer(function SearchPage() {
  return <Quiz model={reactiveModel} />;
});
