interface TodoFormProps {
  newTodo: string;
  setNewTodo: (value: string) => void;
  onAddTodo: () => void;
}

export default function TodoForm({
  newTodo,
  setNewTodo,
  onAddTodo,
}: TodoFormProps) {
  return (
    <div className="flex mb-6">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
        className="flex-grow p-3 border border-blue-300 rounded-l-md bg-white text-blue-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        onKeyPress={(e) => e.key === "Enter" && onAddTodo()}
      />
      <button
        onClick={onAddTodo}
        className="px-6 py-3 bg-blue-500 text-white border-none rounded-r-md cursor-pointer text-base font-bold hover:bg-blue-600 transition-colors"
      >
        Add
      </button>
    </div>
  );
}
