import { observer } from "mobx-react-lite";
import RegisterView from "../views/registerView";
export default observer(function RegisterRender(props) {
  function handleRegisterACB() {
    props.model.registerAccount();
  }
  function setPasswordCB(password) {
    props.model.setPassword(password);
  }
  function setEmailCB(email) {
    console.log(email);
    props.model.setEmail(email);
  }
  return (
    <RegisterView
      email={props.model.userCredentials.email}
      password={props.model.userCredentials.password}
      user={props.model.userCredentials}
      handleRegister={handleRegisterACB}
      setEmail={setEmailCB}
      setPassword={setPasswordCB}
      isAuthenticated = {props.model.isAuthenticated}
    />
  );
});
