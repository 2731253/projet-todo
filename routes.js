import { Router } from "express";
import { supprimerTodo, ajoutTodo } from "./model/todo.js";

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

//Route pour ajouter une tache
router.post("/api/todo", async (request, response) => {
  const { titre, description, statut, priorite, date_creation, date_limite, assignation } = request.body;
  try {
      const todo = await ajoutTodo(titre, description, statut, priorite,  date_creation, date_limite, assignation);
      response
          .status(200)
          .json({ todo, message: "Tâche ajoutée avec succès" });
  } catch (error) {
      response.status(400).json({ error: error.message });
  }
});
