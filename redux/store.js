import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
// import todosReducer from "./todos/todosSlicer";

const store = configureStore({
    reducer: rootReducer,
//   reducer: todosReducer,
});

export default store;
