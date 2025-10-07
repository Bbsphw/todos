import { combineReducers } from "@reduxjs/toolkit";
import todosReducer from "./todos/todosSlicer";
import usersReducer from "./todos/usersSlicer";

const rootReducer = combineReducers({
  todos: todosReducer,
  users: usersReducer,
});

export default rootReducer;