const todoTemplate = document.getElementById("todo-template");

const ajouterTache = document.getElementsByClassName("ajouter-tache");

window.onload = function () {
  const now = new Date();

  const today = new Date(now);
  const formattedToday = today.toISOString().slice(0, 16);
  document.getElementById("todo-date-creation").value = formattedToday;

  now.setDate(now.getDate() + 1);
  const tomorrow = new Date(now);
  const formattedTomorrow = tomorrow.toISOString().slice(0, 16);
  document.getElementById("todo-date-limite").value = formattedTomorrow;
};
