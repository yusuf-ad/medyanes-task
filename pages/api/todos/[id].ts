/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NextApiRequest, NextApiResponse } from "next";
import {
  getDataByUnique,
  updateDataByAny,
  deleteDataByAny,
} from "@/services/serviceOperations";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { method, query } = req;
  const { id } = query;

  // Handle preflight request
  if (method === "OPTIONS") {
    return res.status(200).end();
  }

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Todo ID is required" });
  }

  switch (method) {
    case "GET":
      try {
        const todo = await getDataByUnique("todo", { id });
        if (todo.error) {
          return res.status(500).json({ error: todo.error });
        }
        if (!todo) {
          return res.status(404).json({ error: "Todo not found" });
        }
        return res.status(200).json(todo);
      } catch {
        return res.status(500).json({ error: "Failed to fetch todo" });
      }

    case "PUT":
      try {
        const { title, content, completed } = req.body;

        const updateData: any = {};
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        if (completed !== undefined) updateData.completed = completed;

        if (Object.keys(updateData).length === 0) {
          return res.status(400).json({ error: "No update data provided" });
        }

        const updatedTodo = await updateDataByAny("todo", { id }, updateData);

        if (updatedTodo.error) {
          return res.status(500).json({ error: updatedTodo.error });
        }

        return res.status(200).json(updatedTodo);
      } catch {
        return res.status(500).json({ error: "Failed to update todo" });
      }

    case "DELETE":
      try {
        const deletedTodo = await deleteDataByAny("todo", { id });

        if (deletedTodo.error) {
          return res.status(500).json({ error: deletedTodo.error });
        }

        return res.status(200).json({ message: "Todo deleted successfully" });
      } catch {
        return res.status(500).json({ error: "Failed to delete todo" });
      }

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE", "OPTIONS"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
