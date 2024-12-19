import { createSlice } from "@reduxjs/toolkit";



const initialState={counter:5};

const counterSlice=createSlice({
    name:'counter',
    initialState,
    reducers:{
        increment(state){
            state.counter++;
        },
        decrement(state){
            state.counter--;
        }
    }
})

export const {increment,decrement}=counterSlice.actions;
export default counterSlice.reducer;
