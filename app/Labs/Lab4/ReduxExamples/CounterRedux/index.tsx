import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterReducer";
import { RootState } from "../../store";
import { Button } from "react-bootstrap";
export default function CounterRedux() {
  const { count } = useSelector((state: RootState) => state.counterReducer);
  const dispatch = useDispatch();
  return (
    <div id="wd-counter-redux">
      <h2>Counter Redux</h2>
      <h3>{count}</h3>
      <Button
        variant="success"
        className="me-2"
        id="wd-counter-redux-increment-click"
        onClick={() => dispatch(increment())}
      >
        Increment
      </Button>

      <Button
        variant="danger"
        id="wd-counter-redux-decrement-click"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </Button>
      <hr />
    </div>
  );
}
