const todoTemplate = document.getElementById("todo-template");
const ajouterTache = document.getElementsByClassName("ajouter-tache");
const boutonSauvegarder = document.getElementById("todo-sauvegarder");

window.onload = () => {
  const formatLocal = (date) => {
    const offset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
    return new Date(date - offset).toISOString().slice(0, 16);
  };

  const aujordhui = new Date();
  const demain = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  document.getElementById("todo-date-creation").value = formatLocal(aujordhui);
  document.getElementById("todo-date-limite").value = formatLocal(demain);
};

boutonSauvegarder.addEventListener("click", function (event) {
  event.preventDefault();
});
