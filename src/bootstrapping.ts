import { observable, configure, reaction } from "mobx"
import { model } from "./model/model";
configure({enforceActions:"always"})
// add a proper model object:
export const reactiveModel = observable(model)

// TODO side effects, connect to persistence etc
global.myModel= reactiveModel;   // make application state available in Console

