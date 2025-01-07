import { configureStore } from "@reduxjs/toolkit";
//import counterSlice from "../thunk/counterSlice/index";
import counterSlice from "../thunk/counterSlice/index";
import TaskSlice from "../thunk/TasklSlice/index";
import DeviceSlice from "../thunk/DeviceSlice/index";
import LoginSlice from "../thunk/LoginSlice/index";
import HouseDashboardSlice from "../thunk/DashboardSlice/index";
import WetherDashboardSlice from "../thunk/WeatherDashboard/index";

const store = configureStore({
  reducer: {
    counters: counterSlice,
    Task: TaskSlice,
    Weather: DeviceSlice,
    Login: LoginSlice,
    Dashboard: HouseDashboardSlice,
    WeatherDashboard: WetherDashboardSlice,
  },
});
export default store;
