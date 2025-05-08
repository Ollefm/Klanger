import { observable, configure, reaction } from "mobx"
import { model } from "./model/model";
import { userModel } from "./model/userModel";
configure({enforceActions:"never"})
// add a proper model object:
export const reactiveModel = observable(model)
export const reactiveUserModel = observable(userModel)

// TODO side effects, connect to persistence etc
global.myModel= reactiveModel;   // make application state available in Console

