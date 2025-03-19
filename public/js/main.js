const ajoutTodoForm = document.getElementById("ajout-todo-form");
const boutonSauvegarder = document.getElementById("todo-sauvegarder");
const boutonSupprimer = document.getElementById("bouton-supprimer");
const todoTitre = document.getElementById("todo-titre");
const todoDescription = document.getElementById("todo-description");
const todoStatut = document.getElementById("todo-statut-id");
const todoPriorite = document.getElementById("todo-priorite-id");
const todoDateLimite = document.getElementById("todo-date-limite");
const todoAssignation = document.getElementById("todo-assignation-id");

import { validate } from "./validation.js";

if (boutonSauvegarder) {
  boutonSauvegarder.addEventListener("click", async function (event) {
    event.preventDefault();

    // Si la validation échoue, on arrête l'exécution et on ne soumet pas le formulaire
    if (!validate()) {
      console.log("test");
      return;
    }

    const formulaire = ajoutTodoForm;
    const url = ajoutTodoForm.action;

    let method = "";
    if (ajoutTodoForm.method == "post") {
      // On ajoute un todo (POST)
      method = "POST";
    } else {
      // On modifie un todo (PUT)
      method = "PUT";
    }

    // Mettre les donnees du formulaire dans data
    const data = {
      titre: todoTitre.value,
      description: todoDescription.value,
      statut_id: todoStatut.value,
      priorite_id: todoPriorite.value,
      assignation_id: todoAssignation.value,
    };

    // Ajoute la date en EPOCH millisecondes
    if (todoDateLimite.value) {
      data["date_limite"] = new Date(todoDateLimite.value).getTime();
    }

    // Appel de l'API
    const reponse = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (reponse.ok) {
      const todo = await reponse.json();
      console.log(todo);

      // On retourne a la page principale
      window.location.href = "/";
    }
  });
}

if (boutonSupprimer) {
  boutonSupprimer.addEventListener("click", async function () {
    const url = ajoutTodoForm.action; // "/api/todo/:id"

    // Appel de l'API
    const reponse = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (reponse.ok) {
      const todo = await reponse.json();
      console.log(todo);

      // On retourne a la page principale
      window.location.href = "/";
    }
  });
}
