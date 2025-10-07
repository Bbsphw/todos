import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addUser(state, action) {
      console.log(`Action = ${action.type}`);
      console.log(`Payload = ${action.payload}`);
      state.push({
        user_id: action.payload,
      });
    },
  },
});

const { actions, reducer } = usersSlice;
export const { addUser } = actions;
export default reducer;
