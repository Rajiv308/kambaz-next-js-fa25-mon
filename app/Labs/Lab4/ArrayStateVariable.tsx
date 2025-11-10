/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { ListGroup, ListGroupItem } from "react-bootstrap";
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
      <button
        onClick={addElement}
        style={{
          backgroundColor: "#4caf50",
          color: "white",
          padding: "8px 14px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "14px",
          fontWeight: 500,
        }}
      >
        Add Element
      </button>
      <ul>
        {array.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "200px",
              padding: "8px 4px",
              borderBottom: "1px solid #ddd",
              fontSize: "16px",
            }}
          >
            {item}
            <button
              onClick={() => deleteElement(index)}
              style={{
                backgroundColor: "#ff4d4f",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "4px 10px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
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
