const inputCourriel = document.getElementById("input-courriel");
const inputMotDePasse = document.getElementById("input-mot-de-passe");
const inputCourriel2 = document.getElementById("input-courriel2");
const inputMotDePasse2 = document.getElementById("input-mot-de-passe2");
const inputNom = document.getElementById("input-nom");

const formConnexion = document.getElementById("form-connexion");
const formInscription = document.getElementById("form-inscription");

const sectionConnexion = document.getElementById("section-connexion");
const sectionInscription = document.getElementById("section-inscription");

const btnAfficherInscription = document.getElementById(
    "btn-afficher-inscription"
);
const btnRetourConnexion = document.getElementById("btn-retour-connexion");

// Afficher le formulaire d'inscription
btnAfficherInscription.addEventListener("click", () => {
    sectionConnexion.style.display = "none";
    sectionInscription.style.display = "flex";
});

// Revenir au formulaire de connexion
btnRetourConnexion.addEventListener("click", () => {
    sectionInscription.style.display = "none";
    sectionConnexion.style.display = "flex";
});

// Connexion
formConnexion.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
        email: inputCourriel.value,
        password: inputMotDePasse.value,
    };

    const response = await fetch("/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        window.location.replace("/");
    }
});

// Inscription
formInscription.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
        email: inputCourriel2.value,
        password: inputMotDePasse2.value,
        nom: inputNom.value,
    };

    const response = await fetch("/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        window.location.replace("/");
    }
});
