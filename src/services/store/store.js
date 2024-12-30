import { configureStore } from "@reduxjs/toolkit";
//import counterSlice from "../thunk/counterSlice/index";
import counterSlice from "../thunk/counterSlice/index";
import TaskSlice from "../thunk/TasklSlice/index";
import WeatherSlice from "../thunk/WeatherSlice/index";
import LoginSlice from "../thunk/LoginSlice/index";
const store = configureStore({
  reducer: {
    counters: counterSlice,
    Task: TaskSlice,
    Weather: WeatherSlice,
    Login: LoginSlice,
  },
});
export default store;
