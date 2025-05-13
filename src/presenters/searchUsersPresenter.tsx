import { observer } from "mobx-react-lite";
import SearchUsersView from "../views/searchUsersView";

export default observer(function SearchUsers(props) {
  
  function handleUserSearchACB() {
    props.userModel.getUsers();
  }

  function handleSearchTextCB(q : string){
    props.userModel.setUserSearchQuery(q)
  }

  function handleChallengeUserACB(user){
    props.userModel.challengeUser(user);
  }

  return (
    <SearchUsersView
     promiseChallengeState={{
      loading: props.userModel.challengeUserState.loading,
      isSuccessful: props.userModel.challengeUserState.isSuccessful,
      error: props.userModel.challengeUserState.error,
    }}
      challengeUser = {handleChallengeUserACB}
      promiseState = {props.userModel.userSearchPromiseState}
      model = {props.userModel}
      searchQuery = {props.userModel.userSearch}  
      doUserSeach={handleUserSearchACB}
      setSearchText = {handleSearchTextCB}
      users={props.userModel.userSearchPromiseState.data}
      challengedUsers={props.userModel.challengedUsersId}
    />
  );
});
