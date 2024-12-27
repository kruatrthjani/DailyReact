import { configureStore } from "@reduxjs/toolkit";
//import counterSlice from "../thunk/counterSlice/index";
import counterSlice from "../thunk/counterSlice/index";
import TaskSlice from "../thunk/TasklSlice/index";
import WeatherSlice from "../thunk/WeatherSlice/index";

const store = configureStore({
  reducer: {
    counters: counterSlice,
    Task: TaskSlice,
    Weather: WeatherSlice,
  },
});
export default store;
