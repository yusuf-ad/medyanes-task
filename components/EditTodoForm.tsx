"use client";

import { useState } from "react";
import { Todo } from "./types";

interface EditTodoFormProps {
  todo: Todo;
  onUpdateTodo: (id: string, title: string, content?: string) => void;
  onCancelEdit: () => void;
}

export default function EditTodoForm({
  todo,
  onUpdateTodo,
  onCancelEdit,
}: EditTodoFormProps) {
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content || "");

  const handleSave = () => {
    if (title.trim() === "") return;
    onUpdateTodo(todo.id, title, content || undefined);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-purple-400 mb-4">Edit Todo</h2>
      <div className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSave()}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Todo description (optional)"
          rows={3}
          className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
        />
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
          >
            Save Changes
          </button>
          <button
            onClick={onCancelEdit}
            className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
