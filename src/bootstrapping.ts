import { observable, configure, reaction } from "mobx"
import { userModel } from "./model/userModel";
import { quizModel } from "./model/quizModel";
import { connectToPersistence } from "./firestoreModels/firestoreUserModel"; // Persistence logic
configure({enforceActions:"never"})
// add a proper model object:

export const reactiveUserModel = observable(userModel)
export const reactiveModelQuizModel = observable(quizModel)

reactiveModelQuizModel.setCurrentTrackId("9968843")

connectToPersistence(reactiveUserModel, reaction);

