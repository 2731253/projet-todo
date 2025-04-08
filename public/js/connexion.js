let inputCourriel = document.getElementById("input-courriel");
let inputMotDePasse = document.getElementById("input-mot-de-passe");
let formConnexion = document.getElementById("form-connexion");

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
        window.location.replace("/");
    } else {
        let data = await response.json();

        alert("echec de connexion", data.erreur);

        // Utiliser "data" pour afficher l'erreur ;a
        // l'utilisateur ici ...
    }
});
