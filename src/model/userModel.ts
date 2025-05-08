import { challengeUser } from "../firestoreModels/firebaseGameModel";
import {
  signInWithEmail,
  signUpWithEmail,
  searchUsersByUsername,
} from "../firestoreModels/firestoreUserModel";
import { SignUpData, AppUser } from "../types/user";
import { getUserFriendlyAuthErrorMessage } from "../utils/utils";

export const userModel = {
  user: {
    uid: "",
    email: "",
    username: "",
    createdAt: {},
  } as AppUser,
  loginAndRegistrationPromiseState: {
    isLoading: false as boolean,
    error: null as any,
  } as Object,
  userCredentials: {
    email: "",
    password: "",
    username: "",
  } as SignUpData,
  userSearch: "" as string,
  userSearchPromiseState: {
    isLoading: false as boolean,
    data: [] as AppUser[] | null[],
    error: null,
  } as Object,
  isAuthenticated: false as boolean,

  setEmail(email: string): void {
    this.userCredentials.email = email;
  },
  setPassword(password: string): void {
    this.userCredentials.password = password;
  },
  setUsername(username: string): void {
    this.userCredentials.username = username;
  },

  setUserSearchQuery(query: string): void {
    this.userSearch = query;
  },

  async registerAccount() {
    this.loginAndRegistrationPromiseState.isLoading = true;
    try {
      await signUpWithEmail(this.userCredentials);
      this.loginAndRegistrationPromiseState.error = null;
      // Call the login function after registratio
      await this.login()
    } catch (error: any) {
      this.loginAndRegistrationPromiseState.error =
        getUserFriendlyAuthErrorMessage(error);
    } finally {
      this.loginAndRegistrationPromiseState.isLoading = false;
    }
  },

  async login() {
    this.loginAndRegistrationPromiseState.isLoading = true;
    try {
      const user = await signInWithEmail(
        this.userCredentials.email,
        this.userCredentials.password
      );
      this.user = user;
      this.loginAndRegistrationPromiseState.error = null;
      console.log("User logged in:", this.user);
      this.isAuthenticated = true;
    } catch (error) {
      this.isAuthenticated = false;
      this.loginAndRegistrationPromiseState.error =
        getUserFriendlyAuthErrorMessage(error);
      console.error("Login failed:", error);
    } finally {
      if (this.isAuthenticated === true) {
        this.userCredentials.email = "";
        this.userCredentials.username = "";
        this.userCredentials.password = "";
      }
      this.loginAndRegistrationPromiseState.isLoading = false;
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
    const toUserid = toUser.uid
    try {
      await challengeUser(this.user.uid, toUserid);
    } catch (error) {
      console.error(error);
    }
  },
};
