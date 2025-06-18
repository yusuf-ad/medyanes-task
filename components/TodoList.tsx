import TodoItem from "./TodoItem";
import { Todo } from "./types";

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onStartEdit: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
}

export default function TodoList({
  todos,
  onToggleComplete,
  onStartEdit,
  onDeleteTodo,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="text-center text-blue-400 text-lg">
        No todos yet. Add some!
      </p>
    );
  }

  const sortedTodos = todos.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <ul className="list-none p-0">
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onStartEdit={onStartEdit}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}
