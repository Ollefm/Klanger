import { observer } from "mobx-react-lite";
import LoginView from "../views/authViews/loginView";

export default observer(function LoginRender(props) {
  function handleLoginACB(email: string, password: string) {
    props.userModel.login(email, password);
  }

  return (
    <LoginView
    promiseState={{
      isLoading: props.userModel.loginAndRegistrationPromiseState.isLoading,
      error: props.userModel.loginAndRegistrationPromiseState.error,
    }}
      handleLogin={handleLoginACB}
    />
  );
});
