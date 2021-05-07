import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { Row, Col, Card, PageHeader, message } from "antd";
import "antd/dist/antd.css";
import "./App.less";

import { TodoList } from "./components/TodoList";
import { AddTodoForm } from "./components/AddTodoForm";

const initialTodos: Todo[] = [
  {
    id: "1",
    text: "Walk the dog",
    complete: false,
  },
  {
    id: "2",
    text: "Write app",
    complete: true,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo: ToggleTodo = (selectedTodo: Todo) => {
    const newTodos = todos.map((todo) => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      }
      return todo;
    });
    setTodos(newTodos);
    message.info("Todo state updated!");
  };

  const removeTodo: RemoveTodo = (selectedTodo: Todo) => {
    const newTodos = todos.filter((todo) => todo.id !== selectedTodo.id);

    setTodos(newTodos);
    message.warn("Todo removed!");
  };

  const addTodo: AddTodo = (text: string) => {
    const newTodo = { id: uuidv4(), text, complete: false };
    setTodos([...todos, newTodo]);
    message.success("Todo added!");
  };

  return (
    <Row
      justify="center"
      align="middle"
      gutter={[0, 20]}
      className="todos-container"
    >
      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Card title="Create a new todo">
          <AddTodoForm addTodo={addTodo} />
        </Card>
      </Col>

      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Card title="Todo List">
          <TodoList
            todos={todos}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        </Card>
      </Col>
    </Row>
  );
}

export default App;
