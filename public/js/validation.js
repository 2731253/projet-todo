const todoTitre = document.getElementById("todo-titre");
const todoDescription = document.getElementById("todo-description");
const erreur_titre = document.getElementById("error-titre");
const erreur_description = document.getElementById("error-description");

export const validate = () => {
  let isValid = true;

  // Clear previous error messages
  erreur_titre.innerHTML = "";
  erreur_description.innerHTML = "";

  // Validation du titre
  if (!todoTitre.value) {
    erreur_titre.innerHTML = "Le titre est obligatoire.";
    isValid = false;
  } else if (todoTitre.value.length < 5) {
    erreur_titre.innerHTML = "Le titre doit contenir au moins 5 caractères.";
    isValid = false;
  } else if (todoTitre.value.length > 30) {
    erreur_titre.innerHTML = "Le titre ne doit pas dépasser 30 caractères.";
    isValid = false;
  }

  // Validation de la description
  if (!todoDescription.value) {
    erreur_description.innerHTML = "La description est obligatoire.";
    isValid = false;
  } else if (todoDescription.value.length < 5) {
    erreur_description.innerHTML =
      "La description doit contenir au moins 5 caractères.";
    isValid = false;
  } else if (todoDescription.value.length > 150) {
    erreur_description.innerHTML =
      "La description ne doit pas dépasser 150 caractères.";
    isValid = false;
  }

  return isValid;
};
