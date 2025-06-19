import type { NextApiRequest, NextApiResponse } from "next";
import { getAllData, createNewData } from "@/services/serviceOperations";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { method } = req;

  switch (method) {
    case "OPTIONS":
      // Handle preflight request
      return res.status(200).end();

    case "GET":
      try {
        const todos = await getAllData("todo");
        if (todos.error) {
          return res.status(500).json({ error: todos.error });
        }
        return res.status(200).json(todos);
      } catch {
        return res.status(500).json({ error: "Failed to fetch todos" });
      }

    case "POST":
      try {
        const { title, content } = req.body;

        if (!title) {
          return res.status(400).json({ error: "Title is required" });
        }

        const newTodo = await createNewData("todo", {
          title,
          content: content || "",
          completed: false,
        });

        if (newTodo.error) {
          return res.status(500).json({ error: newTodo.error });
        }

        return res.status(201).json(newTodo);
      } catch {
        return res.status(500).json({ error: "Failed to create todo" });
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "OPTIONS"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
