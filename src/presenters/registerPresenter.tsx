import { observer } from "mobx-react-lite";
import RegisterView from "../views/authViews/registerView";
export default observer(function RegisterRender(props) {

  function handleRegisterACB(email : string , username : string , password: string) {
    props.userModel.registerAccount(email, username, password);
  }
  
  return (
    <RegisterView
    promiseState={{
      isLoading: props.userModel.loginAndRegistrationPromiseState.isLoading,
      error: props.userModel.loginAndRegistrationPromiseState.error,
    }}
      handleRegister={handleRegisterACB}
    />
  );
});
