import { Router } from "express";
import { supprimerTodo, ajoutTodo, getTodo, getTodos,updateTodo } from "./model/todo.js";


const router = Router();

//Definition des routes

/*
router.get("/", async (request, response) => {
  response.render("index", {
      titre: "Accueil",
      styles: ["css/style.css"],
      scripts: ["./js/main.js"],
      todos: await getTodos(),
  });
});
*/

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

//Route pour obtenir la liste des taches
router.get("/api/todos", async (request, response) => {
  try {
      const todos = await getTodos();
      response.status(200).json(todos);
  } catch (error) {
      response.status(400).json({ error: error.message });
  }
});

//Route pour obtenir une tâche
router.get("/api/todo/:id", async (request, response) => {
  const { id } = request.params;
  try {
      const todo = await getTodo(parseInt(id));
      if (todo) {
      response.status(200).json(todo);
      }
      else {
        response.status(404).json({ message: "Tâche non trouvée" });
      }
  } catch (error) {
      response.status(400).json({ error: error.message });
  }
});

// Mettre a jour une tâche
//Route pour mettre a jour une tache
router.put("/api/todo/:id", async (request, response) => {
  const { id } = request.params;
  const { titre, description, statut, priorite, date_limite, assignation } = request.body;
  try {
      const todo = await updateTodo(parseInt(id),titre, description, statut, priorite, date_limite, assignation);
      if (todo) {
          response
              .status(200)
              .json({ todo, message: "Tâche mise à jour avec succès" });
      } else {
          response.status(404).json({ message: "Tâche non trouvée" });
      }
  } catch (error) {
      response.status(400).json({ error: error.message });
  }
});


export default router;

