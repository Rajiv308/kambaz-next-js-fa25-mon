/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
export default function ArrayStateVariable() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);

  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };
  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <Button variant="success" onClick={addElement}>
        Add Element
      </Button>
      <ListGroup className="mt-2 mb-2">
        {array.map((item, index) => (
          <ListGroupItem
            key={index}
            className="d-flex justify-content-between align-items-center"
            style={{ borderColor: "#555" }}
          >
            {item}
            <Button variant="danger" onClick={() => deleteElement(index)}>
              Delete
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>{todo.title}</ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
