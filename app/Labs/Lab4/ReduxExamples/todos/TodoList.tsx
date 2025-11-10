/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ListGroup } from "react-bootstrap";
import "./styles.css";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
export default function TodoList() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);
  return (
    <div>
      <h2>Todo List</h2>
      <ListGroup style={{ maxWidth: "500px" }}>
        <TodoForm />
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
