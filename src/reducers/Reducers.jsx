/*
 * Project: AppDemo
 * Module: reducers/Reducers.jsx
 */

import {combineReducers} from "redux"
import {session} from "./Session"

const appReducer = combineReducers({
  session,
});

export default appReducer
