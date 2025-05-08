import { observer } from "mobx-react-lite";
import RegisterView from "../views/authViews/registerView";
export default observer(function RegisterRender(props) {

  function handleRegisterACB() {
    props.userModel.registerAccount();
  }
  function setPasswordCB(password : string) {
    props.userModel.setPassword(password);
  }

  function setEmailCB(email : string) {
    props.userModel.setEmail(email);
  }

  function setUsernameCB(username : string){
    props.userModel.setUsername(username)
  }
  return (
    <RegisterView
    promiseState={{
      isLoading: props.userModel.loginAndRegistrationPromiseState.isLoading,
      error: props.userModel.loginAndRegistrationPromiseState.error,
    }}
      email = {props.userModel.userCredentials.email}
      username = {props.userModel.userCredentials.username}
      password = {props.userModel.userCredentials.password}
      handleRegister={handleRegisterACB}
      setEmail={setEmailCB}
      setPassword={setPasswordCB}
      setUsername={setUsernameCB}
      isAuthenticated = {props.userModel.isAuthenticated}
    />
  );
});
