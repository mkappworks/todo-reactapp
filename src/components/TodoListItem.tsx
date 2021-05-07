import React from "react";
import { Tooltip, Tag, List, Button, Popconfirm, Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import "./TodoListItem.less";

interface Props {
  todo: Todo;
  toggleTodo: ToggleTodo;
  removeTodo: RemoveTodo;
}

// export const TodoListItem: React.FC<Props> = ({ todo, toggleTodo }) => {
//   return (
//     <li>
//       <label
//         style={{ textDecoration: todo.complete ? "line-through" : undefined }}
//       >
//         <input
//           type="checkbox"
//           checked={todo.complete}
//           onClick={() => {
//             toggleTodo(todo);
//           }}
//         />{" "}
//         {todo.text}
//       </label>
//     </li>
//   );
// };

export const TodoListItem: React.FC<Props> = ({
  todo,
  toggleTodo,
  removeTodo,
}) => {
  return (
    <List.Item
      actions={[
        <Tooltip
          title={todo.complete ? "Mark as uncompleted" : "Mark as completed"}
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => toggleTodo(todo)}
            defaultChecked={todo.complete}
          />
        </Tooltip>,
        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => {
            removeTodo(todo);
          }}
        >
          <Button className="remove-todo-button" type="primary" danger>
            X
          </Button>
        </Popconfirm>,
      ]}
      className="list-item"
      key={todo.id}
    >
      <div className="todo-item">
        <Tag color={todo.complete ? "cyan" : "red"} className="todo-tag">
          {todo.text}
        </Tag>
      </div>
    </List.Item>
  );
};
