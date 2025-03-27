import { observable, configure, reaction } from "mobx"
configure({enforceActions:"always"})
// TODO, add a proper model object:
export const reactiveModel=observable({})
// TODO side effects, connect to persistence etc
global.myModel= reactiveModel;   // make application state available in Console