import { observable, configure, reaction } from "mobx"
import { userModel } from "./model/userModel";
import {model } from "./model/model";
import { connectToPersistence } from "./firestoreModels/firestoreUserModel"; // Persistence logic
configure({enforceActions:"never"})
// add a proper model object:

export const reactiveUserModel = observable(userModel)
export const reactiveModel = observable(model)

connectToPersistence(reactiveUserModel, reaction);

