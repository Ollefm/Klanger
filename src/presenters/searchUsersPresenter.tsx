import { observer } from "mobx-react-lite";
import SearchUsersView from "../views/searchUsersView";
import { useEffect } from "react";

type SearchUsersProps = {
  userModel: {
    getUsers: () => void;
    setUserSearchQuery: (q: string) => void;
    challengeUser: (user: any) => void;
    challengeUserState: {
      loading: boolean;
      isSuccessful: boolean;
      error: any;
    };
    userSearchPromiseState: {
      data: any;
      // add other properties as needed
    };
    userSearch: string;
    challengedUsersId: any;
    userData: any;
    listenForGames: () => Promise<void>;
  };
};

export default observer(function SearchUsers(props: SearchUsersProps) {

   useEffect(() => {
    async function fetchInitialData() {
      await props.userModel.listenForGames();
    }
    
    fetchInitialData();
  }, []);
  
  async function handleUserSearchACB() {
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
      userData={props.userModel.userData}
    />
  );
});
