let inputCourriel = document.getElementById("input-courriel");
let inputMotDePasse = document.getElementById("input-mot-de-passe");
let formConnexion = document.getElementById("form-connexion");
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
