//Bouton filtrage

const boutonFlitrer = document.getElementById("bouton-filtrage");

boutonFlitrer.addEventListener("mouseover", () => {
  const menuFiltre = document.getElementById("menu-filtrage");
  menuFiltre.style.display = "flex";
})

boutonFlitrer.addEventListener("mouseout", () => {
  const menuFiltre = document.getElementById("menu-filtrage");
  menuFiltre.style.display = "none";
})

document.getElementById("filtreFaible").addEventListener("click", () => {
  window.location.href = "/pageFiltrer/1";
})

document.getElementById("filtreMoyen").addEventListener("click", () => {
  window.location.href = "/pageFiltrer/2";
})

document.getElementById("filtreEleve").addEventListener("click", () => {
  window.location.href = "/pageFiltrer/3";
})

document.getElementById("filtreDesactiver").addEventListener("click", () => {
  window.location.href = "/";
})

//Bouton trier

const boutonTrie = document.getElementById("bouton-trier");

boutonTrie.addEventListener("mouseover", () => {
  const menuTrier = document.getElementById("menu-trier");
  menuTrier.style.display = "flex";
})

boutonTrie.addEventListener("mouseout", () => {
  const menuTrier = document.getElementById("menu-trier");
  menuTrier.style.display = "none";
})

document.getElementById("valider-tri").addEventListener("click", async () => {
  let sortBy = '';
  let sort = '';
  if (document.getElementById("trie-date-limite").checked) {
    sortBy = 'date_limite';
    if (document.getElementById("trie-desc").checked) {
      sort = 'desc';
    }
    else { sort = 'asc' }
  }
  else if (document.getElementById("trie-date-creation").checked) {
    sortBy = 'date_creation';
    if (document.getElementById("trie-desc").checked) {
      sort = 'desc';
    }
    else { sort = 'asc' }
  }

  window.location.href = `/pageSort?sortBy=${sortBy}&sort=${sort}`;
})

document.getElementById("trieDesactiver").addEventListener("click", () => {
  window.location.href = "/";
})

//Determine l'orde de trie
const trieOrdreDecroissant = () => {
  if (document.getElementById("trie-desc").checked) {
    return true
  }

  return false
}