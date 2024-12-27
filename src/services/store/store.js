import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../api/thunk/counterSlice/index";
import TaskSlice from "../api/thunk/TasklSlice/index";
import WeatherSlice from "../api/thunk/WeatherSlice/index";

const store = configureStore({
  reducer: {
    counters: counterSlice,
    Task: TaskSlice,
    Weather: WeatherSlice,
  },
});
export default store;
