import { Router } from "express";
import { supprimerTodo } from "./model/todo.js";

const router = Router();

//Definition des routes
/*  ............. */

router.delete("/api/todo/:id", (request, response) => {
  const { id } = request.params;
  try {
    const todo = supprimerTodo(parseInt(id));
    if (!todo) {
      response.status(200).json({ note, message: "Todo supprimer" });
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

export default router;
