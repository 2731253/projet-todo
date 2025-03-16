import { Router } from "express";
import { supprimerTodo, ajoutTodo, getTodo, getTodos,updateTodo,getFilterTodo, getSortedTodos } from "./model/todo.js";


const router = Router();

//Definition des routes


router.get("/", async (request, response) => {
  response.render("index", {
      titre: "Accueil",
      styles: ["css/style.css"],
      scripts: ["./js/main.js","./js/validation.js"],
      todos: await getTodos(),
  });
});

router.get("/details/:id", async (request, response) => {
  const { id } = request.params;
  const todo = await getTodo(parseInt(id));;
  response.render("details", {
      todo : todo,
      titre: todo.titre,
      styles: ["/css/style.css","/css/details.css"],
      scripts: ["./js/main.js"],
  });
});


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

//Route pour obtenir la liste des taches filtrer
router.get("/api/filtretodos/", async (request, response) => {
  const {typeFilter} = request.body;
  try {
      const todos = await getFilterTodo(typeFilter);
      response.status(200).json(todos);
  } catch (error) {
      response.status(400).json({ error: error.message });
  }
});

//Route pour obtenir la liste des taches trier
router.get("/api/sortedTodo/", async (request, response) => {
  const {sortBy, sort} = request.body;
  try {
      const todos = await getSortedTodos(sortBy,sort);
      response.status(200).json(todos);
  } catch (error) {
      response.status(400).json({ error: error.message });
  }
});




export default router;

