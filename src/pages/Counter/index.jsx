import { useNavigate, Link } from "react-router-dom";
import { useState, useReducer, useEffect } from "react";
import Button from "../../components/Button";
import CounterTimer from "../../components/Countertimer";
import {
  intialState,
  reducer,
} from "../../services/api/thunk/reducers/counter";
export default function Counter() {
  const navigate = useNavigate();
  //const [counter,setCounter]=useState(0)
  const [state, dispatch] = useReducer(reducer, intialState);
  console.log("state-", state);
  return (
    <>
      <button
        onClick={() => dispatch({ type: "decrement" })}
        disabled={state.counter == 0}
      >
        -
      </button>
      <p className="">{state.counter}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <Button>
        <Link to="/todo">Go to Todo</Link>{" "}
      </Button>
      <CounterTimer />
    </>
  );
}
