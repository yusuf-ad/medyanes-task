import Head from "next/head";
import { useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import EditTodoForm from "../components/EditTodoForm";
import { Todo } from "../components/types";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: newTodo,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
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
        todo.id === editingTodo.id
          ? { ...todo, text: editText, createdAt: new Date().toISOString() }
          : todo
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

        <TodoForm
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          onAddTodo={addTodo}
        />

        {editingTodo && (
          <EditTodoForm
            editingTodo={editingTodo}
            editText={editText}
            setEditText={setEditText}
            onSaveEdit={saveEdit}
            onCancelEdit={cancelEdit}
          />
        )}

        <TodoList
          todos={todos}
          onToggleComplete={toggleComplete}
          onStartEdit={startEdit}
          onDeleteTodo={deleteTodo}
        />
      </main>
    </div>
  );
}
