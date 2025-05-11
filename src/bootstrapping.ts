import { observable, configure, reaction } from "mobx"
import { userModel } from "./model/userModel";
import { connectToPersistence } from "./firestoreModels/firestoreUserModel"; // Persistence logic
configure({enforceActions:"never"})
// add a proper model object:

export const reactiveUserModel = observable(userModel)

connectToPersistence(reactiveUserModel, reaction);

