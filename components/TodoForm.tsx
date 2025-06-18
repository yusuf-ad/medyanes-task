import { useState } from "react";

interface TodoFormProps {
  onAddTodo: (title: string, content?: string) => void;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (title.trim() === "") return;
    onAddTodo(title, content || undefined);
    setTitle("");
    setContent("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-blue-400 mb-4">Add New Todo</h2>
      <div className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todo title"
          className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit()}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Todo description (optional)"
          rows={3}
          className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
        />
        <button
          onClick={handleSubmit}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 cursor-pointer"
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}
