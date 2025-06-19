import Head from "next/head";
import { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import TodoForm from "@/components/TodoForm";
import EditTodoForm from "@/components/EditTodoForm";
import { Todo } from "@/components/types";
import { useTodoStore } from "@/store/todoStore";

export default function Home() {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const {
    todos,
    isLoading,
    error,
    fetchTodos,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    setError,
  } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async (title: string, content?: string) => {
    try {
      await addTodo(title, content);
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  const handleToggleComplete = async (id: string) => {
    try {
      await toggleTodo(id);
    } catch (error) {
      console.log("Error toggling todo:", error);
    }
  };

  const handleStartEdit = (todo: Todo) => {
    try {
      setEditingTodo(todo);
    } catch (error) {
      console.log("Error starting edit:", error);
    }
  };

  const handleUpdateTodo = async (
    id: string,
    title: string,
    content?: string
  ) => {
    try {
      await updateTodo(id, { title, content });
    } catch (error) {
      console.log("Error updating todo:", error);
    }
    setEditingTodo(null);
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
              <h2 className="text-xl font-bold text-red-400 mb-2">Error</h2>
              <p className="text-red-300">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Simple Todo App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Todo App
          </h1>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 mb-6">
            <TodoForm onAddTodo={handleAddTodo} />
          </div>

          {editingTodo && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 mb-6">
              <EditTodoForm
                todo={editingTodo}
                onUpdateTodo={handleUpdateTodo}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          )}

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                <p className="mt-2 text-gray-400">Loading todos...</p>
              </div>
            ) : (
              <TodoList
                todos={todos}
                onToggleComplete={handleToggleComplete}
                onStartEdit={handleStartEdit}
                onDeleteTodo={handleDeleteTodo}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
