import { Router } from "express";
import { supprimerTodo, ajoutTodo, getTodo, getTodos, updateTodo, getFilterTodo, getSortedTodos, getPriorites, getStatuts, getUtilisateurs } from "./model/todo.js";
import { isIDValid, isTitreValid, isDescriptionValid, isStatutValid, isPrioriteValid, isDateCreationValid, isDateLimiteValid, isAssignationValid, isSortByValid, isSortValid, isTypeFilterValid, isEmailValid, isNomValid, isPasswordValid} from "./validation.js";

const router = Router();

//Definition des routes

//Route pour ajouter un utilisateur (authentification)
router.post("inscription", async (request, response) => {
  const { email, password, nom } = request.body; 
  if (isEmailValid(email) && isPasswordValid(password) && isNomValid(nom)) {
      try {
          const user = await addUser(email, password, nom);
          response
              .status(200)
              .json({ user, message: "Utilisateur ajouté avec succès" });
      } catch (error) {
          response.status(400).json({ error: error.message });
      }
  } else {
      response.status(400).json({ error: "Email, Password et/ou Nom invalide" });
  }
});

//Route pour afficher les taches par statuts
router.get("/", async (request, response) => {
  if (!request.session.id_user) { // verifier si un user est deja connecter
    request.session.id_user = 123;
  }
  const statuts = await getStatuts();
  const todos = await getTodos();
  response.render("index", {
      titre: "Accueil",
      styles: ["/css/style.css"],
      scripts: ["/js/main.js","/js/validation.js","/js/filtre-trie.js"],
      todos: todos,
      priorites: await getPriorites(),
      statuts: statuts,
      utilisateurs: await getUtilisateurs(),
  });
});

//Route pour afficher les taches filtré par priorité
router.get("/pageFiltrer/:id", async (request, response) => {
  const { id } = request.params;
  const statuts = await getStatuts();
  const todos = await getFilterTodo(parseInt(id));
  response.render("index", {
      titre: "Accueil",
      styles: ["/css/style.css"],
      scripts: ["/js/main.js","/js/validation.js","/js/filtre-trie.js"],
      todos: todos,
      priorites: await getPriorites(),
      statuts: statuts,
      utilisateurs: await getUtilisateurs(),
  });
});

//Route pour afficher les taches trier par date
router.get("/pageSort", async (request, response) => {
  const {sortBy, sort} = request.query;
  const statuts = await getStatuts();
  const todos = await getSortedTodos(sortBy,sort);
  response.render("index", {
      titre: "Accueil",
      styles: ["/css/style.css"],
      scripts: ["/js/main.js","/js/validation.js","/js/filtre-trie.js"],
      todos: todos,
      priorites: await getPriorites(),
      statuts: statuts,
      utilisateurs: await getUtilisateurs(),
  });
});

//Route pour ajouter une tache
router.get('/ajout_tache', async (request, response) => {
  response.render('ajout', {
    titre: "Ajout Tache",
    styles: ["/css/ajout.css"],
    scripts: ["/js/main.js","/js/validation.js"],
    priorites: await getPriorites(),
    statuts: await getStatuts(),
    utilisateurs: await getUtilisateurs(),
  });
});

//Route pour modifier une tache
router.get('/modifie_tache/:id', async (request, response) => {
  const { id } = request.params;
  const todo = await getTodo(parseInt(id));;
  response.render('ajout', {
    titre: "Modifie Tache",
    styles: ["/css/ajout.css"],
    scripts: ["/js/main.js","/js/validation.js"],
    todo,
    priorites: await getPriorites(),
    statuts: await getStatuts(),
    utilisateurs: await getUtilisateurs(),
  });
});

router.get("/details/:id", async (request, response) => {
  const { id } = request.params;
  if(isIDValid(id)) {
    try {
      const todo = await getTodo(parseInt(id));
      response.render("details", {
        todo,
        titre: todo.titre,
        styles: ["/css/style.css","/css/details.css"],
        scripts: ["/js/main.js"],
      });
    } catch {
      response.status(400).json({ error: error.message });
    }
  } else {
    response.status(400).json({error: "ID invalide"});
}
});

//Route pour supprimer une tache
router.delete("/api/todo/:id", async (request, response) => {
  const { id } = request.params;
  if(isIDValid(id)) {
    try {
      const todo = await supprimerTodo(parseInt(id));
      if (todo) {
        response.status(200).json({ todo, message: "Todo supprimer" });
      } else {
        response.status(400).json({error: "ID inconnu"});
      }
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  } else {
    response.status(400).json({error: "ID invalide"});
  }
});

//Route pour ajouter une tache
router.post("/api/todo", async (request, response) => {
  const { titre, description, statut_id, priorite_id, date_creation, date_limite, assignation_id } = request.body;
  if (isTitreValid(titre) && isDescriptionValid(description) && isStatutValid(statut_id) && isPrioriteValid(priorite_id) && isAssignationValid(assignation_id) && isDateCreationValid(date_creation) && isDateLimiteValid(date_limite)) {
    try {
        const todo = await ajoutTodo(titre, description, parseInt(statut_id), parseInt(priorite_id),  date_creation, date_limite, parseInt(assignation_id));
        response
            .status(200)
            .json({ todo, message: "Tâche ajoutée avec succès" });
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
  } else {
    response.status(400).json({error: "Valeur en parametre invalide"});
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
  if(isIDValid(id)){
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
  } else {
    response.status(400).json({error: "ID invalide"});
  } 
});

// Mettre a jour une tâche
//Route pour mettre a jour une tache
router.put("/api/todo/:id", async (request, response) => {
  const { id } = request.params;
  const { titre, description, statut_id, priorite_id, date_limite, assignation_id } = request.body;
  if (isIDValid(id) && isTitreValid(titre) && isDescriptionValid(description) && isStatutValid(statut_id) && isPrioriteValid(priorite_id) && isDateLimiteValid(date_limite) && isAssignationValid(assignation_id)) {
    try {
      const todo = await updateTodo(parseInt(id),titre, description, parseInt(statut_id), parseInt(priorite_id), date_limite, parseInt(assignation_id));
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
  } else {
    response.status(400).json({error: "Valeur en parametre invalide"});
  }
});

//Route pour obtenir la liste des taches filtrer
router.get("/api/filtretodos/", async (request, response) => {
  const {typeFilter} = request.body;
  if (isTypeFilterValid(typeFilter)) {
    try {
        const todos = await getFilterTodo(typeFilter);
        response.status(200).json(todos);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
  } else {
    response.status(400).json({error: "TypeFilter invalide"});
  }
});

//Route pour obtenir la liste des taches trier
router.get("/api/sortedTodo/", async (request, response) => {
  const {sortBy, sort} = request.body;
  if (isSortByValid(sortBy) && isSortValid(sort)) {
    try {
        const todos = await getSortedTodos(sortBy,sort);
        response.status(200).json(todos);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
  } else {
    response.status(400).json({error: "Valeur en parametre invalide"});
  }
});



//Routes pour l'Affichage des détails d'une tache
router.get("/detail/:id", async (req, res) => {
  try {
    const todoId = req.params.id; // Récupérer l'ID de la tâche depuis l'URL
    const todo = await prisma.task.findUnique({
      where: { id: parseInt(todoId) }, // Rechercher la tâche par ID
    });
 
    if (!todo) {
      return res.status(404).send("Tâche non trouvée");
    }
 
    // Rendre la page detailTache.hbs avec les données de la tâche
    res.render("detailsTache", {
      titre: todo.titre,
      description: todo.description,
      statut: todo.statut,
      priorite: todo.priorite,
      assignation: todo.assignation,
      date_creation: todo.date_creation.toLocaleString(),
      date_limite: todo.date_limite.toLocaleString(),
    });
  } catch (error) {
    res.status(500).send("Erreur lors de la récupération des détails de la tâche");
  }
});


export default router;
