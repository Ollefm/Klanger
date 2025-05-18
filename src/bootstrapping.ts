import { observable, configure, reaction } from "mobx"
import { userModel } from "./model/userModel";
import { quizModel } from "./model/quizModel";
import { connectToPersistence } from "./services/authService"; 
configure({enforceActions:"never"})


export const reactiveUserModel = observable(userModel)
export const reactiveModelQuizModel = observable(quizModel)
reactiveModelQuizModel.setCurrentTrackId()


connectToPersistence(reactiveUserModel, reaction);

