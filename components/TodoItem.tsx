import { Todo } from "./types";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onStartEdit: (todo: Todo) => void;
  onDeleteTodo: (id: number) => void;
}

export default function TodoItem({
  todo,
  onToggleComplete,
  onStartEdit,
  onDeleteTodo,
}: TodoItemProps) {
  return (
    <li
      className={`flex items-center justify-between p-4 bg-white border border-blue-300 rounded-md mb-4 shadow-sm ${
        todo.completed ? "opacity-60" : ""
      }`}
    >
      <span
        className={`cursor-pointer flex-grow ${
          todo.completed ? "line-through text-blue-400" : "text-blue-900"
        }`}
        onClick={() => onToggleComplete(todo.id)}
      >
        {todo.text}
        <span className="block text-xs text-blue-400 mt-1">
          Added: {new Date(todo.createdAt).toLocaleString()}
        </span>
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onStartEdit(todo)}
          disabled={todo.completed}
          className={`px-4 py-2 bg-blue-400 text-white border-none rounded-md cursor-pointer text-sm hover:bg-blue-500 transition-colors ${
            todo.completed ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => onDeleteTodo(todo.id)}
          className="px-4 py-2 bg-blue-300 text-blue-900 border border-blue-900 rounded-md cursor-pointer text-sm hover:bg-blue-200 transition-colors"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
