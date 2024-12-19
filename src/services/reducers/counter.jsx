

export function reducer(state, action) {
    switch (action.type) {
        case 'increment': {
            return {
                counter: state.counter + 1
            }
        }
        case 'decrement': {
            return {
                counter: state.counter - 1
            }
        }
        default:
            return state.counter
    }
}


export function counterTimerReducer(state,action){
    switch(action.type){
        case 'start':{
            stTimer:state.stTimer=true
        }
        case 'stop':{
            stTimer:state.stTimer=false
        }
        default:{
            stTimer:state.sttimer=false
        }
    }
}
export const intialState = { counter: 0 }
export const initialTimerState={stTimer:false}