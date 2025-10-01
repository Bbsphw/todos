import { combineReducers } from "@reduxjs/toolkit";
import todosReducer from "./todos/todosSlicer";

const rootReducer = combineReducers({
  todos: todosReducer,
});

export default rootReducer;
