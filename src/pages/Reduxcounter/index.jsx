import { useSelector } from "react-redux";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
//import { increment, decrement } from "../../services/api/thunk/counterSlice";
import { increment, decrement } from "../../services/thunk/counterSlice";
export default function ReduxCounter() {
  const counter = useSelector((state) => state.counters.counter);

  const dispatch = useDispatch();
  return (
    <div className="flex justify-center">
      <Button onClick={() => dispatch(decrement())} disabled={counter == 0}>
        decrement
      </Button>
      {counter}
      <Button onClick={() => dispatch(increment())}>increment</Button>
    </div>
  );
}
