import { observer } from "mobx-react-lite";
import SearchUsersView from "../views/searchUsersView";

export default observer(function SearchUsers(props) {
  function handleUserSearchACB() {
    props.model.getUsers();
  }

  function handleSearchTextCB(q : string){
    props.model.setUserSearchQuery(q)
  }



  return (
    <SearchUsersView
      model = {props.model}
      searchQuery = {props.model.userSearch}  
      doUserSeach={handleUserSearchACB}
      setSearchText = {handleSearchTextCB}
      users={props.model.users}
    />
  );
});
