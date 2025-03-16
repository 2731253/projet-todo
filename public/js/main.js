const todoTemplate = document.getElementById("todo-template");
const ajouterTache = document.getElementsByClassName("ajouter-tache");
const boutonSauvegarder = document.getElementById("todo-sauvegarder");
const boutonSupprimer = document.getElementById("bouton-supprimer");
const todoTitre = document.getElementById("todo-titre");
const todoDescription = document.getElementById("todo-description");
const todoStatut = document.getElementById("todo-statut");
const todoPriorite = document.getElementById("todo-priorite");
const todoDateCreation = document.getElementById("todo-date-creation");
const todoDateLimite = document.getElementById("todo-date-limite");
const todoAssignation = document.getElementById("todo-assignation");

window.onload = () => {
  const formatLocal = (date) => {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date - offset).toISOString().slice(0, 16);
  };

  const aujordhui = new Date();
  const demain = new Date(aujordhui);
  demain.setDate(aujordhui.getDate() + 1);

  document.getElementById("todo-date-creation").value = formatLocal(aujordhui);
  document.getElementById("todo-date-limite").value = formatLocal(demain);
};

function pageReset() {
  const formatLocal = (date) => {
    const decalage = date.getTimezoneOffset() * 60000;
    return new Date(date - decalage).toISOString().slice(0, 16);
  };

  const aujordhui = new Date();
  const demain = new Date(aujordhui);
  demain.setDate(aujordhui.getDate() + 1);

  todoTitre.value = "";
  todoDescription.value = "";
  todoStatut.value = "vide";
  todoPriorite.value = "vide";
  todoDateCreation.value = formatLocal(aujordhui);
  todoDateLimite.value = formatLocal(demain);
  todoAssignation.value = "vide";
}

boutonSauvegarder.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "index.html";
});

boutonSupprimer.addEventListener("click", function () {
  pageReset();
});

function cacherOptionVide(selectElement) {
  const optionVide = selectElement.querySelector('option[value="vide"]');

  optionVide.style.display = "none";

  selectElement.addEventListener("change", function () {
    if (selectElement.value !== "vide") {
      optionVide.style.display = "none";
    } else {
      optionVide.style.display = "";
    }
  });
}

cacherOptionVide(todoStatut);
cacherOptionVide(todoPriorite);
cacherOptionVide(todoAssignation);
