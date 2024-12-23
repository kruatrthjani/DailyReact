import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../counterSlice/index";
import TaskSlice from "../TasklSlice/index";
import WeatherSlice from "../WeatherSlice/index";

const store = configureStore({
  reducer: {
    counters: counterSlice,
    Task: TaskSlice,
    Weather: WeatherSlice,
  },
});
export default store;
