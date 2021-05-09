import React, { useState, useEffect, useCallback } from "react";

import { Row, Col, Card, PageHeader, message } from "antd";
import "antd/dist/antd.css";
import "./App.less";

import { TodoList } from "./components/TodoList";
import { AddTodoForm } from "./components/AddTodoForm";

require("dotenv").config();

const { REACT_APP_BACKEND_URL } = process.env;
const initialTodos: Todo[] = [];

const App = () => {
  const backendURL = `${REACT_APP_BACKEND_URL}`;
  const [todos, setTodos] = useState(initialTodos);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //Fetch Data from the Database
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
  }, [backendURL]);

  useEffect(() => {
    fetchTodosHandler();
  }, [fetchTodosHandler]);

  //Add data to form and Database
  const addTodo: AddTodo = async (text: string) => {
    const newTodo = { text, complete: false };

    const response = await fetch(backendURL, {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    if (response.status === 201) {
      const loadedTodos = [...todos];
      loadedTodos.push({
        _id: data._id,
        text: data.text,
        complete: data.complete,
      });
      setTodos(loadedTodos);
      message.success("Todo Added!");
    }
  };

  const toggleTodo: ToggleTodo = async (selectedTodo: Todo) => {
    const response = await fetch(backendURL + selectedTodo._id, {
      method: "PATCH",
      body: JSON.stringify({
        text: selectedTodo.text,
        complete: !selectedTodo.complete,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const loadedTodos = [...todos];

      const filteredTodos = loadedTodos.map((todo) => {
        if (todo._id === selectedTodo._id) {
          const updatedTodo = {
            _id: selectedTodo._id,
            text: selectedTodo.text,
            complete: !selectedTodo.complete,
          };

          return updatedTodo;
        } else {
          return todo;
        }
      });

      setTodos(filteredTodos);
      message.success("Todo Updated!");
    }
  };

  const removeTodo: RemoveTodo = async (selectedTodo: Todo) => {
    const response = await fetch(backendURL + selectedTodo._id, {
      method: "DELETE",
    });

    if (response.status === 200) {
      const loadedTodos = [...todos];

      const filteredTodos = loadedTodos.filter((todo) => {
        return selectedTodo._id !== todo._id;
      });

      console.log(filteredTodos);

      setTodos(filteredTodos);
      message.warn("Todo removed!");
    }
  };

  let content = (
    <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
  );

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

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
        <PageHeader
          title="Add Todo"
          subTitle="To add a todo, just fill the form below and click in add todo."
        />
      </Col>
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
        <Card title="Todo List">{content}</Card>
      </Col>
    </Row>
  );
};

export default App;
