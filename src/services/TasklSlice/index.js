import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = { tasks: JSON.parse(localStorage.getItem('task')) || [], status: 'idle', error: null }


export const fetchTaskThunk=createAsyncThunk("fetch/AllTasks",async()=>{
    const allTask = JSON.parse(localStorage.getItem('task')) || [];    
    console.log("task=",allTask)
    return allTask;
})

export const addTaskThnuk = createAsyncThunk("Addtasks/allTasks", async (data) => {

    const allTask = JSON.parse(localStorage.getItem('task')) || [];    
    allTask.push(data)

    
    localStorage.setItem('task', JSON.stringify(allTask))
    return allTask;
})

export const deleteTaskThunk = createAsyncThunk("deleteTasks/AllTasks", async (id) => {
    console.log("id=", id)
    const allTask = JSON.parse(localStorage.getItem('task'))
    const task = allTask.filter((task) => task.id !== id)
    console.log("delete=", task)
    localStorage.setItem('task', JSON.stringify(task))
    return task;
})

export const editTaskThunk=createAsyncThunk("editTasks/AllTasks",async(data)=>{
    
    const allTask = JSON.parse(localStorage.getItem('task'))
    const task=allTask.map((task)=>task.id==data.id ? {...task,name:data.name}:task)
    console.log("task=",task)
    localStorage.setItem('task',JSON.stringify(task))
    return task;
})


export const completeTaskThunk=createAsyncThunk("complete/Alltasks",async(id)=>{
    const allTask = JSON.parse(localStorage.getItem('task'));    
    const solotask=allTask.find((task)=>task.id===id)
    const toggleer=solotask.completed==true?false:true;    
    const task=allTask.map((task)=>task.id==id ?{...task,completed:toggleer}:task)    
    localStorage.setItem('task',JSON.stringify(task))
    return task;
})

const TaskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        // AddTask(state, action) {
        //     console.log(state)

        // },
        // DeleteTask(state, action) {
        //     const { id } = action.payload;
        //     state.task = state.task.filter((tas) => tas.id !== id)
        // },
        // EditTask(state, action) {
        //     const { id, name } = action.payload;
        //     state.task = state.task.map((tas) => tas.id === id ? { ...tas, name: name } : tas)
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTaskThunk.pending,(state)=>{
                state.status="loading";
                state.error=null;
            })
            .addCase(fetchTaskThunk.fulfilled,(state,action)=>{
                state.status="succeeded";
                state.tasks=action.payload;
            })
            .addCase(fetchTaskThunk.rejected,(state)=>{
                state.status="failed";
                state.error="something wnet wrong";
            })
            .addCase(completeTaskThunk.pending,(state)=>{
                state.status="loading";
                state.error=null;
            })
            .addCase(completeTaskThunk.fulfilled,(state,action)=>{
                state.status="succeeded";
                state.tasks=action.payload;
            })
            .addCase(completeTaskThunk.rejected,(state)=>{
                state.status="failed";
                state.error="something wnet wrong";
            })
            .addCase(addTaskThnuk.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(addTaskThnuk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tasks = action.payload;
            })
            .addCase(addTaskThnuk.rejected, (state) => {
                state.status = "failed";
                state.error = "Something went wrong";
            })
            .addCase(deleteTaskThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteTaskThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tasks = action.payload;
            })
            .addCase(deleteTaskThunk.rejected, (state) => {
                state.status = "failed";
                state.status = "something went wrong"
            })
            .addCase(editTaskThunk.pending,(state)=>{
                state.status="loading";
                state.error=null;            
            })
            .addCase(editTaskThunk.fulfilled,(state,action)=>{
                state.status="succeeded";
                state.tasks=action.payload;
            })
            .addCase(editTaskThunk.rejected,(state)=>{
                state.status="failed";
                state.status="something went wrong"
            })
    },
})

export default TaskSlice.reducer
export const { AddTask, DeleteTask, EditTask } = TaskSlice.actions