import { observer } from "mobx-react-lite";
import LoginView from "../views/authViews/loginView";

export default observer(function LoginRender(props) {
  function handleLoginACB() {
    props.userModel.login();
  }
  function setPasswordCB(password) {
    props.userModel.setPassword(password);
  }
  function setEmailCB(email) {
    console.log(email)
    props.userModel.setEmail(email);
  }
  return (
    <LoginView
    promiseState={{
      isLoading: props.userModel.loginAndRegistrationPromiseState.isLoading,
      error: props.userModel.loginAndRegistrationPromiseState.error,
    }}
      email = {props.userModel.userCredentials.email}
      password = {props.userModel.userCredentials.password}  
      user={props.userModel.userCredentials}
      handleLogin={handleLoginACB}
      setEmail={setEmailCB}
      setPassword={setPasswordCB}
      isAuthenticated = {props.userModel.isAuthenticated}
    />
  );
});
