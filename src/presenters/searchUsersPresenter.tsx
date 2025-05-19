import { observer } from "mobx-react-lite";
import SearchUsersView from "../views/searchUsersView";
import { useEffect } from "react";

type SearchUsersProps = {
  userModel: {
    getUsers: () => void;
    setUserSearchQuery: (q: string) => void;
    challengeUser: (user: any) => any;
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
    pendingChallengeIds: any;
    userData: any;
    listenForGames: () => Promise<void>;
    listenForChallenges: () => Promise<void>;
    listenForChallengesStatus: () => Promise<void>;
  };
};

export default observer(function SearchUsers(props: SearchUsersProps) {

  //console.log("in the presenter", props.userModel.pendingChallengeIds)
   useEffect(() => {
    async function fetchInitialData() {
      await props.userModel.listenForGames();
      await props.userModel.listenForChallengesStatus();
    }
    
    fetchInitialData();
  }, []);

  async function refreshChallengesACB() {
    console.log("Refreshing challenges...");
    await props.userModel.listenForChallengesStatus();
  }
  async function handleUserSearchACB() {
    props.userModel.getUsers();
  }

  function handleSearchTextCB(q : string){
    props.userModel.setUserSearchQuery(q)
  }

  function handleChallengeUserACB(user){
    props.userModel.challengeUser(user).then(() => {
      refreshChallengesACB();
    });
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
      pendingChallenges={props.userModel.pendingChallengeIds}
      userData={props.userModel.userData}
      refreshChallenges={refreshChallengesACB} 
    />
  );
});
