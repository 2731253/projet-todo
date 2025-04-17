const todoTitre = document.getElementById("todo-titre");
const todoDescription = document.getElementById("todo-description");
const erreur_titre = document.getElementById("error-titre");
const erreur_description = document.getElementById("error-description");
const erreurCourriel2 = document.getElementById("erreur-courriel2");
const erreurMotdepasse2 = document.getElementById("erreur-motdepasse2");
const erreurNom = document.getElementById("erreur-nom");

const erreurCourriel = document.getElementById("erreur-courriel");
const erreurMotdepasse = document.getElementById("erreur-motdepasse");

const inputCourriel = document.getElementById("input-courriel");
const inputMotDePasse = document.getElementById("input-mot-de-passe");

const inputCourriel2 = document.getElementById("input-courriel2");
const inputMotDePasse2 = document.getElementById("input-mot-de-passe2");
const inputNom = document.getElementById("input-nom");

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
        erreur_titre.innerHTML =
            "Le titre doit contenir au moins 5 caractères.";
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
export function validateConnexion() {
    let isValid = true;
    const email = inputCourriel.value;
    const password = inputMotDePasse.value;

    erreurCourriel.innerHTML = "";
    erreurMotdepasse.innerHTML = "";

    // Validation du courriel
    if (!email) {
        erreurCourriel.innerHTML = "Le courriel est obligatoire.";
        isValid = false;
    } else if (email.length < 5) {
        erreurCourriel.innerHTML =
            "Le courriel doit contenir au moins 5 caractères.";
        isValid = false;
    } else if (email.length > 50) {
        erreurCourriel.innerHTML =
            "Le courriel ne doit pas dépasser 50 caractères.";
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        erreurCourriel.innerHTML = "Le courriel n'est pas valide.";
        isValid = false;
    }

    // Validation du mot de passe
    if (!password) {
        erreurMotdepasse.innerHTML = "Le mot de passe est obligatoire.";
        isValid = false;
    } else if (password.length < 8) {
        erreurMotdepasse.innerHTML =
            "Le mot de passe doit contenir au moins 8 caractères.";
        isValid = false;
    } else if (password.length > 16) {
        erreurMotdepasse.innerHTML =
            "Le mot de passe ne doit pas dépasser 16 caractères.";
        isValid = false;
    }

    return isValid;
}

export function validateInscription() {
    let isValid = true;
    const email = inputCourriel2.value;
    const password = inputMotDePasse2.value;
    const nom = inputNom.value;

    erreurCourriel2.innerHTML = "";
    erreurMotdepasse2.innerHTML = "";
    erreurNom.innerHTML = "";

    // Validation courriel
    if (!email) {
        erreurCourriel2.innerHTML = "Le courriel est obligatoire.";
        isValid = false;
    } else if (email.length < 5) {
        erreurCourriel2.innerHTML =
            "Le courriel doit contenir au moins 5 caractères.";
        isValid = false;
    } else if (email.length > 50) {
        erreurCourriel2.innerHTML =
            "Le courriel ne doit pas dépasser 50 caractères.";
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        erreurCourriel2.innerHTML = "Le courriel n'est pas valide.";
        isValid = false;
    }

    // Validation mot de passe
    if (!password) {
        erreurMotdepasse2.innerHTML = "Le mot de passe est obligatoire.";
        isValid = false;
    } else if (password.length < 8) {
        erreurMotdepasse2.innerHTML =
            "Le mot de passe doit contenir au moins 8 caractères.";
        isValid = false;
    } else if (password.length > 16) {
        erreurMotdepasse2.innerHTML =
            "Le mot de passe ne doit pas dépasser 16 caractères.";
        isValid = false;
    }

    // Validation nom
    if (!nom) {
        erreurNom.innerHTML = "Le nom est obligatoire.";
        isValid = false;
    } else if (nom.length < 3) {
        erreurNom.innerHTML = "Le nom doit contenir au moins 3 caractères.";
        isValid = false;
    } else if (nom.length > 20) {
        erreurNom.innerHTML = "Le nom ne doit pas dépasser 20 caractères.";
        isValid = false;
    }

    return isValid;
}
