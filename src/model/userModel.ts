import { challengeUser } from "../firestoreModels/firebaseGameModel";
import { User as FirebaseUser, signOut } from "firebase/auth"; // Firebase Auth User type
import {
  signInWithEmail,
  signUpWithEmail,
  searchUsersByUsername,
  signOutUser
} from "../firestoreModels/firestoreUserModel";
import { SignUpData, AppUser } from "../types/user";
import { getUserFriendlyAuthErrorMessage } from "../utils/utils";

export const userModel = {
  user: null as FirebaseUser | null,
  userData: null as AppUser | null,
  loginAndRegistrationPromiseState: {
    isLoading: false as boolean,
    error: null as any,
  } as Object,
  userSearch: "" as string,
  userSearchPromiseState: {
    isLoading: false as boolean,
    data: [] as AppUser[] | null[],
    error: null,
  } as Object,

  setUserSearchQuery(query: string): void {
    this.userSearch = query;
  },

  async registerAccount(email: string, username: string, password: string) {
    this.loginAndRegistrationPromiseState.isLoading = true;
    try {
      await signUpWithEmail(email, username, password);
      this.loginAndRegistrationPromiseState.error = null;
    } catch (error: any) {
      this.loginAndRegistrationPromiseState.error =
        getUserFriendlyAuthErrorMessage(error);
    } finally {
      this.loginAndRegistrationPromiseState.isLoading = false;
    }
  },

  async login(email: string, password: string) {
    this.loginAndRegistrationPromiseState.isLoading = true;
    try {
      await signInWithEmail(email, password);
      this.loginAndRegistrationPromiseState.error = null;
    } catch (error) {
      this.isAuthenticated = false;
      this.loginAndRegistrationPromiseState.error =
        getUserFriendlyAuthErrorMessage(error);
      console.error("Login failed:", error);
    } finally {
      this.loginAndRegistrationPromiseState.isLoading = false;
    }
  },

  async signOut(){
    try{
      await signOutUser()
    }catch(error : any){
      console.error("error signing otu:", error)
    }
  },

  async getUsers() {
    this.userSearchPromiseState.isLoading = true;
    try {
      const users = await searchUsersByUsername(this.userSearch);
      this.userSearchPromiseState.data = users;
      this.userSearchPromiseState.error = null;
    } catch (error) {
      this.userSearchPromiseState.error = error;
      console.error("getUsers failed:", error);
    } finally {
      this.userSearchPromiseState.isLoading = false;
    }
  },

  async challengeUser(toUser: any) {
    const toUserid = toUser.uid;
    try {
      await challengeUser(this.user.uid, toUserid);
    } catch (error) {
      console.error(error);
    }
  },
  // WHEN A USER LOGS OUT
  reset() {
    this.user = undefined;
    this.isAuthenticated = false;
    this.loginAndRegistrationPromiseState = {
      isLoading: false,
      error: null,
    };
    this.userSearch = "";
    this.userSearchPromiseState = {
      isLoading: false,
      data: [],
      error: null,
    };
  },
};
