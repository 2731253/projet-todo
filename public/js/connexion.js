let inputCourriel = document.getElementById("input-courriel");
let inputMotDePasse = document.getElementById("input-mot-de-passe");
let inputCourriel2 = document.getElementById("input-courriel2");
let inputMotDePasse2 = document.getElementById("input-mot-de-passe2");
let inputNom = document.getElementById("input-nom");
let formConnexion = document.getElementById("form-connexion");
let formIncription = document.getElementById("form-inscription");
let erreurConnexion = document.getElementById("connexion-erreur");

formConnexion.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
        email: inputCourriel.value,
        password: inputMotDePasse.value,
    };

    let response = await fetch("/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (response.ok) {
        erreurConnexion.innerHTML = "";
        window.location.replace("/");
    } else {
        let data = await response.json();

        erreurConnexion.innerHTML = "echec de connexion:\n\n" + data.error;
    }
});

formIncription.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
        email: inputCourriel2.value,
        password: inputMotDePasse2.value,
        nom: inputNom.value,
    };

    let response = await fetch("/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (response.ok) {
        erreurConnexion.innerHTML = "";
        window.location.replace("/");
    } else {
        let data = await response.json();

        erreurConnexion.innerHTML = "echec de d'inscription:\n\n" + data.error;
    }
});
