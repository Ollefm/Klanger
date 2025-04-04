import { observer } from "mobx-react-lite";
import LoginView from "../views/loginView";

export default observer(function LoginRender(props) {
  function handleLoginACB() {
    props.model.login();
  }
  function setPasswordCB(password) {
    props.model.setPassword(password);
  }
  function setEmailCB(email) {
    console.log(email)
    props.model.setEmail(email);
  }
  return (
    <LoginView
      email = {props.model.userCredentials.email}
      password = {props.model.userCredentials.password}  
      user={props.model.userCredentials}
      handleLogin={handleLoginACB}
      setEmail={setEmailCB}
      setPassword={setPasswordCB}
      isAuthenticated = {props.model.isAuthenticated}
    />
  );
});
