interface Todo {
  _id: string;
  text: string;
  complete: boolean;
}

type RemoveTodo = (selectedTodo: Todo) => void;

type ToggleTodo = (selectedTodo: Todo) => void;

type AddTodo = (text: string) => void;
