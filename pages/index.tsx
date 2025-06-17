import Head from "next/head";
import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    if (editingTodo && editingTodo.id === id) {
      setEditingTodo(null);
      setEditText("");
    }
  };

  const startEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (!editingTodo || editText.trim() === "") return;
    setTodos(
      todos.map((todo) =>
        todo.id === editingTodo.id ? { ...todo, text: editText } : todo
      )
    );
    setEditingTodo(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingTodo(null);
    setEditText("");
  };

  return (
    <div className="bg-blue-50 text-blue-900 min-h-screen p-8">
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Simple Todo App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-2xl mx-auto">
        <h1 className="text-center text-blue-500 text-3xl font-bold mb-8">
          My Todos
        </h1>

        <div className="flex mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="flex-grow p-3 border border-blue-300 rounded-l-md bg-white text-blue-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
          />
          <button
            onClick={addTodo}
            className="px-6 py-3 bg-blue-500 text-white border-none rounded-r-md cursor-pointer text-base font-bold hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </div>

        {editingTodo && (
          <div className="mb-6 p-4 bg-blue-100 rounded-md">
            <h2 className="text-blue-500 text-xl font-semibold mt-0 mb-4">
              Edit Todo
            </h2>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-3 border border-blue-300 rounded-md bg-white text-blue-900 text-base mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onKeyPress={(e) => e.key === "Enter" && saveEdit()}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-blue-500 text-white border-none rounded-md cursor-pointer text-sm hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                className="px-4 py-2 bg-blue-400 text-white border-none rounded-md cursor-pointer text-sm hover:bg-blue-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <ul className="list-none p-0">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-4 bg-white border border-blue-300 rounded-md mb-4 shadow-sm ${
                todo.completed ? "opacity-60" : ""
              }`}
            >
              <span
                className={`cursor-pointer flex-grow ${
                  todo.completed
                    ? "line-through text-blue-400"
                    : "text-blue-900"
                }`}
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.text}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(todo)}
                  disabled={todo.completed}
                  className={`px-4 py-2 bg-blue-400 text-white border-none rounded-md cursor-pointer text-sm hover:bg-blue-500 transition-colors ${
                    todo.completed ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="px-4 py-2 bg-blue-300 text-blue-900 border border-blue-900 rounded-md cursor-pointer text-sm hover:bg-blue-200 transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        {todos.length === 0 && !editingTodo && (
          <p className="text-center text-blue-400 text-lg">
            No todos yet. Add some!
          </p>
        )}
      </main>
    </div>
  );
}
