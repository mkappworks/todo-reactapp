import React, { useState, useEffect, useCallback } from "react";

import { Row, Col, Card, PageHeader, message } from "antd";
import "antd/dist/antd.css";
import "./App.less";

import { TodoList } from "./components/TodoList";
import { AddTodoForm } from "./components/AddTodoForm";

const initialTodos: Todo[] = [];

const backendURL = "https://todo-nodedeploy.herokuapp.com/";

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodosHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(backendURL);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      console.log(data);

      const loadedTodos = [];

      for (const key in data) {
        loadedTodos.push({
          _id: data[key]._id,
          text: data[key].text,
          complete: data[key].complete,
        });
      }

      setTodos(loadedTodos);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [fetch]);

  useEffect(() => {
    fetchTodosHandler();
  }, [fetchTodosHandler]);

  const addTodo: AddTodo = (text: string) => {
    const newTodo = { text, complete: false };

    addTodoHandler(newTodo);
    fetchTodosHandler();

    message.success("Todo added!");
  };

  const addTodoHandler = async (todo: { text: string; complete: boolean }) => {
    const response = await fetch(backendURL, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
  };

  const toggleTodo: ToggleTodo = (selectedTodo: Todo) => {
    updateTodoHandler(selectedTodo);

    fetchTodosHandler();
    message.info("Todo state updated!");
  };

  const updateTodoHandler = async (todo: {
    _id: string;
    text: string;
    complete: boolean;
  }) => {
    console.log(todo);
    const response = await fetch(backendURL + todo._id, {
      method: "PATCH",
      body: JSON.stringify({ text: todo.text, complete: !todo.complete }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
  };

  const removeTodo: RemoveTodo = (selectedTodo: Todo) => {
    deleteTodoHandler(selectedTodo._id);

    fetchTodosHandler();
    message.warn("Todo removed!");
  };

  const deleteTodoHandler = async (_id: string) => {
    const response = await fetch(backendURL + _id, {
      method: "DELETE",
    });

    const data = await response.json();
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
