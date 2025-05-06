import { observer } from "mobx-react-lite";
import RegisterView from "../views/authViews/registerView";
export default observer(function RegisterRender(props) {

  function handleRegisterACB() {
    props.model.registerAccount();
  }
  function setPasswordCB(password : string) {
    props.model.setPassword(password);
  }

  function setEmailCB(email : string) {
    props.model.setEmail(email);
  }

  function setUsernameCB(username : string){
    props.model.setUsername(username)
  }
  return (
    <RegisterView
      email = {props.model.userCredentials.email}
      username = {props.model.userCredentials.username}
      password = {props.model.userCredentials.password}
      handleRegister={handleRegisterACB}
      setEmail={setEmailCB}
      setPassword={setPasswordCB}
      setUsername={setUsernameCB}
      isAuthenticated = {props.model.isAuthenticated}
    />
  );
});
