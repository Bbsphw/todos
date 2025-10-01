import { createSlice } from "@reduxjs/toolkit";

const INIT_DATA = [
  // { id: 1, task: "Play with cat" },
  // { id: 2, task: "Yoga" },
  // { id: 3, task: "Teaching" },
];

const todosSlice = createSlice({
  name: "todos",
  initialState: INIT_DATA,
  reducers: {
    addTodo(state, action) {
      console.log(`Action = ${action.type}`);
      console.log(`Payload = ${action.payload}`);
      // const lastID = Math.max(...state.map((todo) => todo.id));
      state.push({ id: action.payload.id, task: action.payload.task });
    },
    editTodo(state, action) {
      state.find((obj) => {
        if (obj.id == action.payload.id) {
          obj.task = action.payload.task;
          return obj;
        }
      });
    },
    deleteTodo(state, action) {
      return state.filter((obj) => {
        //console.log(`obj.id: ${obj.id} / id: ${id}`)
        return obj.id !== action.payload;
      });
    },
  },
});

const { actions, reducer } = todosSlice;
export const { addTodo, editTodo, deleteTodo } = actions;
export default reducer;
