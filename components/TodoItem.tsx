import { Todo } from "./types";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onStartEdit: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
}

export default function TodoItem({
  todo,
  onToggleComplete,
  onStartEdit,
  onDeleteTodo,
}: TodoItemProps) {
  return (
    <li
      className={`group p-4 bg-slate-700/30 border border-slate-600 rounded-lg mb-3 hover:bg-slate-700/50 transition-all duration-200 ${
        todo.completed ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className="flex-grow cursor-pointer"
          onClick={() => onToggleComplete(todo.id)}
        >
          <div
            className={`flex items-center gap-3 mb-2 ${
              todo.completed ? "line-through text-gray-400" : "text-white"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                todo.completed
                  ? "bg-green-500 border-green-500"
                  : "border-gray-400 hover:border-blue-400"
              }`}
            >
              {todo.completed && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <h3 className="font-semibold text-lg">{todo.title}</h3>
          </div>

          {todo.content && (
            <p
              className={`text-sm ml-8 mb-2 ${
                todo.completed ? "text-gray-500" : "text-gray-300"
              }`}
            >
              {todo.content}
            </p>
          )}

          <span className="block text-xs text-gray-500 ml-8">
            Created:{" "}
            {new Date(todo.createdAt).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onStartEdit(todo)}
            disabled={todo.completed}
            className={`px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors ${
              todo.completed ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => onDeleteTodo(todo.id)}
            className="px-3 py-1.5 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
