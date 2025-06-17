import { Todo } from "./types";

interface EditTodoFormProps {
  editingTodo: Todo;
  editText: string;
  setEditText: (value: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

export default function EditTodoForm({
  editingTodo,
  editText,
  setEditText,
  onSaveEdit,
  onCancelEdit,
}: EditTodoFormProps) {
  return (
    <div className="mb-6 p-4 bg-blue-100 rounded-md">
      <h2 className="text-blue-500 text-xl font-semibold mt-0 mb-4">
        Edit Todo
      </h2>
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        className="w-full p-3 border border-blue-300 rounded-md bg-white text-blue-900 text-base mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onKeyPress={(e) => e.key === "Enter" && onSaveEdit()}
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={onSaveEdit}
          className="px-4 py-2 bg-blue-500 text-white border-none rounded-md cursor-pointer text-sm hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
        <button
          onClick={onCancelEdit}
          className="px-4 py-2 bg-blue-400 text-white border-none rounded-md cursor-pointer text-sm hover:bg-blue-500 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
