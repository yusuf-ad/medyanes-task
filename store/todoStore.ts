import { create } from "zustand";
import { Todo } from "@/components/types";
import { postAPI, getAPI } from "@/services/fetchAPI";

interface TodoStore {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  deletingTodoIds: string[];

  // Actions
  fetchTodos: () => Promise<void>;
  addTodo: (title: string, content?: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  setError: (error: string | null) => void;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  isLoading: false,
  error: null,
  deletingTodoIds: [],

  fetchTodos: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getAPI("/api/todos");
      if (data?.error) {
        throw new Error(data.error);
      }
      set({ todos: data || [], isLoading: false });
    } catch (error) {
      console.log("Error fetching todos:", error);

      set({
        error: error instanceof Error ? error.message : "Failed to fetch todos",
        isLoading: false,
      });
    }
  },

  addTodo: async (title: string, content = "") => {
    set({ isLoading: true, error: null });
    try {
      const data = await postAPI("/api/todos", { title, content });
      if (data?.error) {
        throw new Error(data.error);
      }
      set((state) => ({
        todos: [data, ...state.todos],
        isLoading: false,
      }));
    } catch (error) {
      console.log("Error adding todo:", error);

      set({
        error: error instanceof Error ? error.message : "Failed to add todo",
        isLoading: false,
      });
    }
  },

  toggleTodo: async (id: string) => {
    const { todos } = get();
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const data = await postAPI(
        `/api/todos/${id}`,
        { completed: !todo.completed },
        "PUT"
      );
      if (data?.error) {
        throw new Error(data.error);
      }
      set((state) => ({
        todos: state.todos.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        ),
      }));
    } catch (error) {
      console.log("Error toggling todo:", error);

      set({
        error: error instanceof Error ? error.message : "Failed to toggle todo",
      });
    }
  },

  updateTodo: async (id: string, updates: Partial<Todo>) => {
    try {
      const data = await postAPI(`/api/todos/${id}`, updates, "PUT");
      if (data?.error) {
        throw new Error(data.error);
      }
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      }));
    } catch (error) {
      console.log("Error updating todo:", error);

      set({
        error: error instanceof Error ? error.message : "Failed to update todo",
      });
    }
  },

  deleteTodo: async (id: string) => {
    const { deletingTodoIds } = get();
    if (deletingTodoIds.includes(id)) return;

    set((state) => ({ deletingTodoIds: [...state.deletingTodoIds, id] }));
    try {
      const data = await postAPI(`/api/todos/${id}`, {}, "DELETE");
      if (data?.error) {
        throw new Error(data.error);
      }
      set((state) => ({
        todos: state.todos.filter((t) => t.id !== id),
      }));
    } catch (error) {
      console.log("Error deleting todo:", error);

      set({
        error: error instanceof Error ? error.message : "Failed to delete todo",
      });
    } finally {
      set((state) => ({
        deletingTodoIds: state.deletingTodoIds.filter((dId) => dId !== id),
      }));
    }
  },

  setError: (error: string | null) => set({ error }),
}));
