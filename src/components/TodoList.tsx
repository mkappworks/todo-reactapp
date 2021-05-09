import React from "react";

import { List } from "antd";

import { TodoListItem } from "./TodoListItem";

interface Props {
  todos: Todo[];
  toggleTodo: ToggleTodo;
  removeTodo: RemoveTodo;
}

export const TodoList: React.FC<Props> = ({
  todos,
  toggleTodo,
  removeTodo,
}) => (
  <List
    locale={{
      emptyText: "There's nothing to do :(",
    }}
    dataSource={todos}
    renderItem={(todo) => (
      <TodoListItem
        todo={todo}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
      />
    )}
    pagination={{
      position: "bottom",
      pageSize: 10,
    }}
  />
);


