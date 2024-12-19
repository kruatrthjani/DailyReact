import { configureStore } from "@reduxjs/toolkit";
import counterSlice from '../counterSlice/index'
import TaskSlice from '../TasklSlice/index'

const store=configureStore({
    reducer:{
        counters:counterSlice,
        Task:TaskSlice,
    }
})
export default store

