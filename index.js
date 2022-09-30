const form = document.querySelector("form");

let array = [];
let arrayExtract = [];
let itemStock = {};
let itemExtract = {};
let indexMemory = null;
let modifElement = 0; /* 1 : création d'un élément / 2 : modif d'un élément existant / 3 : delete / 4: indéterminé : suppression ou modif ? / 5: lecture */
let inputChecked = false;
let keyPressedEnter = false;
let keyPressedValid = false;
let keyPressedSuppr = false;
let keyPressedRech = false;
let keyPressedInit = false;
let keyPressedClicElement = false;
let inputFound = false;
let stringClicked = "";
//-----------------------------------------------------------
//--- appel du chargement de la page (load) à partir du LOCAL STORAGE
//---------------------------------------------------------------------
window.addEventListener("load", () => {
  console.log("load");
  itemStock.itemName = null;
  getItems();
});

//----------------------------------------------------------------------
//------- Fonction de chargement de la page à partir du LOCAL STORAGE
//---------------------------------------------------------------
function getItems(e) {
  console.log("récupération de la liste dans Local Storage");
  if (window.localStorage.itemStorage) {
    // list.innerHTML = JSON.parse(window.localStorage.itemStorage);
    // array = [];
    array = JSON.parse(window.localStorage.itemStorage);
    console.log("Nouvelle liste : ");
    console.log(JSON.parse(window.localStorage.itemStorage));
    listDisplay();
  } else {
    console.log("Local Storage vide");
    list.innerHTML = `<li>Liste vide: créez un élément grâce au formulaire ci-dessus</li>`;
  }
}
//----------------------------------------------------------------------
//------- Fonction de chargement de la liste à partir de arrayExtract
//---------------------------------------------------------------
function getExtract(e) {
  console.log("récupération de l'extrait sur mot-clé");
  list.innerHTML = "";
  console.log("affichage extrait de la liste : " + arrayExtract.length);

  if (arrayExtract.length === 0) {
    console.log("tableau des extraits vide");
  } else {
    for (let i = 0; i < arrayExtract.length; i++) {
      list.innerHTML += `<li><h4>${arrayExtract[i].itemName}</h4><span> STOCK bureau: </span><em>${arrayExtract[i].quantityStockage}</em> <span> Camion1: </span><em>${arrayExtract[i].quantityCamion1}</em> <span> Camion2: </span><em>${arrayExtract[i].quantityCamion2}</em> <span> Client: </span><em>${arrayExtract[i].quantityClient}</em><span> Prix U: </span><em>${arrayExtract[i].priceEstimation}  €</em></li>`;
    }
  }
  // ------- Réinitialisation des inputs du formulaire
  // item.value = "";
  place1.value = 0;
  place2.value = 0;
  place3.value = 0;
  place4.value = 0;
  price.value = 0;
}
//----------------------------------------------------------------------
//------- Fonction permettant de récupérer l'élément cliqué et l'afficher à l'écran
//---------------------------------------------------------------

//********************************* */

//----------------
// Affichage dans la liste
//----------------------

function listDisplay(e) {
  list.innerHTML = "";
  console.log("affichage liste : " + array.length);

  if (array.length === 0) {
    console.log("tableau temporaire vide");
  } else {
    for (let i = 0; i < array.length; i++) {
      list.innerHTML += `<li><h4>${array[i].itemName}</h4><span> STOCK bureau: </span><em>${array[i].quantityStockage} </em> <span> Camion1: </span><em>${array[i].quantityCamion1}</em> <span> Camion2: </span><em>${array[i].quantityCamion2}</em> <span> Client: </span><em>${array[i].quantityClient}</em><span> Prix U: </span><em>${array[i].priceEstimation}  €</em></li>`;
    }
  }

  // ------- Réinitialisation des inputs du formulaire
  item.value = "";
  place1.value = 0;
  place2.value = 0;
  place3.value = 0;
  place4.value = 0;
  price.value = 0;
}

//---------------------------------
// Détection saisie d'un élément existant ou non dans le tableau temporaire,
// et lancement du contrôle de l'itemName
//-----------------------------------------------------------------------------

item.addEventListener("input", (e) => {
  console.log("détection input item : ");
  console.log(item.value);
  message.innerHTML = `Renseigner le formulaire`;

  // contrôle de l'input : pas d'accents ni de caractères spéciaux
  if (!item.value.match(/^[a-zA-Z0-9\s]*$/)) {
    console.log(
      "Le libellé ne doit pas avoir d'accent ni de caractères spéciaux"
    );
    // alert("Le libellé ne doit pas avoir d'accent ni de caractères spéciaux");
    message.innerHTML = `Le libellé ne doit pas avoir d'accent ni de caractères spéciaux`;
    item.value = null;
    place1.value = 0;
    place2.value = 0;
    place3.value = 0;
    place4.value = 0;
    price.value = 0;
    inputChecked = false;
  } else {
    inputChecked = true;
    console.log("input correct");
    itemStock.itemName = item.value;
    console.log("itemStock.itemName : " + itemStock.itemName);
  }
});

price.addEventListener("input", (e) => {
  console.log("détection input price");
  itemStock.priceEstimation = price.value;
  itemStock.quantityStockage = place1.value;
  itemStock.quantityCamion1 = place2.value;
  itemStock.quantityCamion2 = place3.value;
  itemStock.quantityClient = place4.value;
  /* Calcul du montant total pour cet article*/
  itemStock.priceTotal =
    itemStock.priceEstimation *
    (itemStock.quantityStockage +
      itemStock.quantityCamion1 +
      itemStock.quantityCamion2 +
      itemStock.quantityClient);
});

place1.addEventListener("input", (e) => {
  console.log("détection input place1");
  itemStock.priceEstimation = price.value;
  itemStock.quantityStockage = place1.value;
  itemStock.quantityCamion1 = place2.value;
  itemStock.quantityCamion2 = place3.value;
  itemStock.quantityClient = place4.value;
  /* Calcul du montant total pour cet article*/
  itemStock.priceTotal =
    itemStock.priceEstimation *
    (itemStock.quantityStockage +
      itemStock.quantityCamion1 +
      itemStock.quantityCamion2 +
      itemStock.quantityClient);
});

place2.addEventListener("input", (e) => {
  console.log("détection input place2");
  itemStock.priceEstimation = price.value;
  itemStock.quantityStockage = place1.value;
  itemStock.quantityCamion1 = place2.value;
  itemStock.quantityCamion2 = place3.value;
  itemStock.quantityClient = place4.value;
  /* Calcul du montant total pour cet article*/
  itemStock.priceTotal =
    itemStock.priceEstimation *
    (itemStock.quantityStockage +
      itemStock.quantityCamion1 +
      itemStock.quantityCamion2 +
      itemStock.quantityClient);
});
place3.addEventListener("input", (e) => {
  console.log("détection input place3");
  itemStock.priceEstimation = price.value;
  itemStock.quantityStockage = place1.value;
  itemStock.quantityCamion1 = place2.value;
  itemStock.quantityCamion2 = place3.value;
  itemStock.quantityClient = place4.value;
  /* Calcul du montant total pour cet article*/
  itemStock.priceTotal = eval(
    itemStock.priceEstimation *
      (itemStock.quantityStockage +
        itemStock.quantityCamion1 +
        itemStock.quantityCamion2 +
        itemStock.quantityClient)
  );
});
place4.addEventListener("input", (e) => {
  console.log("détection input place4");
  itemStock.priceEstimation = price.value;
  itemStock.quantityStockage = place1.value;
  itemStock.quantityCamion1 = place2.value;
  itemStock.quantityCamion2 = place3.value;
  itemStock.quantityClient = place4.value;
  /* Calcul du montant total pour cet article*/
  itemStock.priceTotal = eval(
    itemStock.priceEstimation *
      (itemStock.quantityStockage +
        itemStock.quantityCamion1 +
        itemStock.quantityCamion2 +
        itemStock.quantityClient)
  );
});

//----------------------
// Détection des changements sur input radio
//-----------------------

optionComplete.addEventListener("click", (e) => {
  e.preventDefault;
  console.log("clic sur bouton radio Complet");
  console.log(e.target);
  document.getElementById("optionStockageBureau").checked = false;
  document.getElementById("optionCamion1").checked = false;
  document.getElementById("optionCamion2").checked = false;
  document.getElementById("optionClient").checked = false;
});

optionStockageBureau.addEventListener("click", (e) => {
  e.preventDefault;
  console.log("clic sur bouton radio Bureau");
  console.log(e.target);
  document.getElementById("optionComplete").checked = false;
  document.getElementById("optionCamion1").checked = false;
  document.getElementById("optionCamion2").checked = false;
  document.getElementById("optionClient").checked = false;
});

optionCamion1.addEventListener("click", (e) => {
  e.preventDefault;
  console.log("clic sur bouton radio Camion1");
  console.log(e.target);
  document.getElementById("optionComplete").checked = false;
  document.getElementById("optionStockageBureau").checked = false;
  document.getElementById("optionCamion2").checked = false;
  document.getElementById("optionClient").checked = false;
});

optionCamion2.addEventListener("click", (e) => {
  e.preventDefault;
  console.log("clic sur bouton radio Camion2");
  console.log(e.target);
  document.getElementById("optionComplete").checked = false;
  document.getElementById("optionStockageBureau").checked = false;
  document.getElementById("optionCamion1").checked = false;
  document.getElementById("optionClient").checked = false;
});

optionClient.addEventListener("click", (e) => {
  e.preventDefault;
  console.log("clic sur bouton radio Client");
  console.log(e.target);
  document.getElementById("optionComplete").checked = false;
  document.getElementById("optionStockageBureau").checked = false;
  document.getElementById("optionCamion1").checked = false;
  document.getElementById("optionCamion2").checked = false;
});

//----------------------
// Détection des évènements
//-----------------------

//--------CLICK SUR ENTREE DETECTE  ---------------------

card.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    console.log("detection de entree : " + e.key);
    keyPressedEnter = true;
    e.preventDefault();
    testAction();
  }
});

//--------CLICK SUR CREER / MODIFIER DETECTE  ---------------------

valid.addEventListener("click", (e) => {
  console.log("détection de Créer/Modifier / ");
  e.preventDefault();
  // itemStock.priceEstimation = price.value;
  // itemStock.quantityStockage = place1.value;
  // itemStock.quantityCamion1 = place2.value;
  // itemStock.quantityCamion2 = place3.value;
  // itemStock.quantityClient = place4.value;
  keyPressedValid = true;
  testAction();
});

//--------CLICK SUR SUPPRIMER DETECTE  ---------------------
suppr.addEventListener("click", (e) => {
  console.log("détection de Supprimer / ");
  e.preventDefault();
  keyPressedSuppr = true;
  testAction();
});

//--------CLICK SUR RECHERCHER DETECTE  ---------------------
rech.addEventListener("click", (e) => {
  console.log("détection de Rechercher / ");
  e.preventDefault();
  keyPressedRech = true;
  testAction();
});
//--------CLICK SUR REFRESH  ---------------------
init.addEventListener("click", (e) => {
  console.log("détection de Refresh / ");
  e.preventDefault();
  keyPressedInit = true;
  testAction();
});

//--------CLICK SUR UN ELEMENT DE LA LISTE  ---------------------
list.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("détection d'un click sur un élément : ");
  keyPressedClicElement = true;
  stringClicked = "";
  console.log("e.path : ");
  console.log(e.path);
  stringClicked = e.path[0];

  // on coupe la chaîne sur STOCK et on ne garde que la première partie (le contenu de h4)
  console.log("on coupe la chaîne sur STOCK");
  console.log(stringClicked.textContent.split(" STOCK"));
  itemStock.itemName = stringClicked.textContent.split(" STOCK")[0];
  console.log(itemStock.itemName);

  item.value = itemStock.itemName;

  searchClicked();
});
//--------CLICK SUR EXPORT ---------------------
exportClicked.addEventListener("click", (e) => {
  e.preventDefault;
  console.log("Clic sur Export détecté");
  console.log("optionComplete checked" + optionComplete.checked);
  console.log("optionStockageBureau checked" + optionStockageBureau.checked);
  console.log("optionCamion1 checked" + optionCamion1.checked);
  console.log("optionCamion2 checked" + optionCamion2.checked);
  console.log("optionClient checked" + optionClient.checked);
  exportData();
});
//--------------------------------------------------------------------------------------------
//--------TEST ACTION---------------------

function testAction() {
  console.log("test action : " + itemStock.itemName + " / " + modifElement);
  // ------------------  Cas REFRESH
  if (keyPressedInit) {
    console.log("action refresh");
    refresh();
  } else if (itemStock.itemName === null) {
    // ------------------ CAS LIBELLE NON SAISI
    message.innerHTML = `Renseigner le formulaire`;
  } else {
    //---------------- CAS RECHERCHE D'UN MOT-CLE
    console.log("inputChecked : " + inputChecked);
    console.log(
      "keyPressed : " +
        keyPressedSuppr +
        "/" +
        keyPressedRech +
        "/" +
        keyPressedValid +
        "/" +
        keyPressedInit +
        "/" +
        keyPressedEnter +
        "/" +
        keyPressedClicElement
    );

    console.log("itemName : " + itemStock.itemName);
    if ((inputChecked = true) && keyPressedRech) {
      modifElement = 5;
      message.innerHTML = `La liste affiche un extrait du stock sur le mot-clé saisi`;
      arrayExtract.splice(0, arrayExtract.length);
      console.log("arrayExtract après initialisation : ");
      console.log(arrayExtract);
      rechItem();
    } else if (keyPressedClicElement) {
      // Cas ELEMENT CLIQUE

      console.log("Cas Elément cliqué, on a déjà les infos");
      console.log("inputFound : " + inputFound);
      console.log("Valid: " + keyPressedValid);
      console.log("Suppr: " + keyPressedSuppr);
      if (keyPressedValid) {
        modifElement = 2;
      } else if (keyPressedSuppr) {
        modifElement = 3;
      } else if (keyPressedEnter) {
        message.innerHTML = `Cliquer sur Suppr ou Créer/Modif`;
        modifElement = 4;
      }
      keyPressedClicElement = false;
    } else if (
      // --------------- CAS SUPPRIMER - CREER - MODIFIER - ENTREE
      (inputChecked = true) &&
      (keyPressedValid || keyPressedEnter || keyPressedSuppr)
    ) {
      inputFound = false;
      searchItem();
      console.log("inputFound : " + inputFound);
      console.log("Valid: " + keyPressedValid);
      console.log("Suppr: " + keyPressedSuppr);
      if (inputFound && keyPressedValid) {
        modifElement = 2;
      } else if (inputFound && keyPressedSuppr) {
        modifElement = 3;
      } else if (!inputFound && keyPressedValid) {
        modifElement = 1;
      } else if (!inputFound && keyPressedSuppr) {
        message.innerHTML = `Demande incohérente : suppression d'un élément inexistant`;
        modifElement = 0;
        keyPressedSuppr = false;
      } else if (keyPressedEnter) {
        message.innerHTML = `Cliquer sur Suppr ou Rechercher ou Créer/Modif`;
        modifElement = 4;
      }
    }
    console.log("modifElement : " + modifElement);

    if (modifElement === 1) {
      createItem();
    } else if (modifElement === 2) {
      modifItem();
    } else if (modifElement === 3) {
      supprItem();
    } else if (modifElement === 5) {
      console.log("après rechItem");
      console.log("Extrait sur mot-clé : " + itemStock.itemName);
      console.log("détecter clic dans la liste");
      //-----puis  Affichage de l'extrait
      getExtract();
      itemStock.itemName = null;
      modifElement = 0;
    } else if (modifElement === 4) {
      console.log("à déterminer : cliquer sur un bouton");
      modifElement = 0;
    } else console.log("à déterminer : cliquer sur un bouton");

    if (modifElement === 1 || modifElement === 2 || modifElement === 3) {
      //-------puis Stockage dans Local Storage
      storeList();
      //-----puis  Affichage de la nouvelle liste
      getItems();
      itemStock.itemName = null;
      modifElement = 0;
    }
  }
}

//------------
// CREATION
//------------
function createItem() {
  console.log("Fonction création");
  console.log("itemStock.itemName: " + itemStock.itemName);

  // modifier tableau temporaire avec les inputs du formulaire (libellé déjà dans itemStock.itemName)
  itemStock.priceEstimation = price.value;
  itemStock.quantityStockage = place1.value;
  itemStock.quantityCamion1 = place2.value;
  itemStock.quantityCamion2 = place3.value;
  itemStock.quantityClient = place4.value;
  itemStock.priceTotal =
    Number(itemStock.priceEstimation) *
    (Number(itemStock.quantityStockage) +
      Number(itemStock.quantityCamion1) +
      Number(itemStock.quantityCamion2) +
      Number(itemStock.quantityClient));
  console.log("itemStock.priceTotal : " + itemStock.priceTotal);
  console.log("nouvel élement dans array");
  console.log(itemStock);
  array.push(itemStock);
  message.innerHTML = `Elément créé`;
  // * réinitialisation des indicateurs de touches */
  keyPressedValid = false;
  keyPressedEnter = false;
  keyPressedSuppr = false;
  keyPressedRech = false;
  keyPressedInit = false;
  keyPressedClicElement = false;
}
//------------
// SUPPRESSION
//------------
function supprItem() {
  console.log("Fonction suppression");

  // enlever un élément du tableau temporaire et affichage liste
  console.log("élément à supprimer : " + itemStock.itemName);

  console.log("indexMemory : " + indexMemory);
  supprArrayElement();
  console.log("array après suppression");
  console.log(array);

  message.innerHTML = `Elément supprimé`;
  // * réinitialisation des indicateurs de touches */
  keyPressedValid = false;
  keyPressedEnter = false;
  keyPressedSuppr = false;
  keyPressedRech = false;
  keyPressedInit = false;
  keyPressedClicElement = false;
}

function supprArrayElement() {
  array.splice(indexMemory, 1);
}
//------------
// MODIF
//------------
function modifItem() {
  console.log("Fonction modification");
  // modifier tableau temporaire avec les inputs du formulaire (sauf libellé)

  console.log("indexMemory : " + indexMemory);

  console.log("itemStock : ");
  console.log(itemStock);
  console.log("array avant modification");
  console.log(array);
  array[indexMemory].priceEstimation = itemStock.priceEstimation;
  array[indexMemory].quantityStockage = itemStock.quantityStockage;
  array[indexMemory].quantityCamion1 = itemStock.quantityCamion1;
  array[indexMemory].quantityCamion2 = itemStock.quantityCamion2;
  array[indexMemory].quantityClient = itemStock.quantityClient;

  itemStock.priceTotal =
    Number(itemStock.priceEstimation) *
    (Number(itemStock.quantityStockage) +
      Number(itemStock.quantityCamion1) +
      Number(itemStock.quantityCamion2) +
      Number(itemStock.quantityClient));
  array[indexMemory].priceTotal = itemStock.priceTotal;
  console.log("itemStock.priceTotal : " + itemStock.priceTotal);
  console.log("array après modification");
  console.log(array);
  message.innerHTML = `Elément modifié`;
  // * réinitialisation des indicateurs de touches */
  keyPressedValid = false;
  keyPressedEnter = false;
  keyPressedSuppr = false;
  keyPressedRech = false;
  keyPressedInit = false;
  keyPressedClicElement = false;
}
//---------------------------------
// Rechercher : EXTRACT sur mot-clé
//-----------------------------------------------------------------------------
function rechItem() {
  console.log("Fonction recherche des ref contenant : " + itemStock.itemName);
  console.log("modifElement avant action: " + modifElement);
  let j = 0;
  inputFound = false;
  for (let i = 0; i < array.length; i++) {
    console.log(
      "entrée dans la boucle de recherche dans tableau temp du mot-clé"
    );
    console.log("itemStock.itemName avant toLowerCase : " + itemStock.itemName);
    console.log(
      "array[i].itemName.toLowerCase() : " + array[i].itemName.toLowerCase()
    );
    console.log(
      "itemStock.itemName.toLowerCase() : " + itemStock.itemName.toLowerCase()
    );
    if (
      array[i].itemName.toLowerCase().includes(itemStock.itemName.toLowerCase())
    ) {
      console.log("mot-clé trouvé : " + itemStock.itemName);
      inputFound = true;
      arrayExtract[j] = array[i];
      console.log("nouvel élement dans arrayExtract");
      console.log(itemExtract);

      // arrayExtract[j] = itemExtract;
      console.log("arrayExtract : ");
      console.log(arrayExtract);
      j++;
    }
  }
  if (inputFound === false) {
    console.log("Elément recherché non trouvé");
    message.innerHTML = `Elément recherché non trouvé`;
  }
  // * réinitialisation des indicateurs de touches */
  keyPressedValid = false;
  keyPressedEnter = false;
  keyPressedSuppr = false;
  keyPressedRech = false;
  keyPressedInit = false;
  keyPressedClicElement = false;

  // modifElement = 0;
}
//------------
// MISE A JOUR LOCAL STORAGE
//------------

function storeList() {
  console.log("mise à jour Local Storage en JSON avec stringify: ");
  const newData = JSON.stringify(array);
  console.log("newData : ");
  console.log(newData);
  // window.localStorage.setItem = ("itemStorage", JSON.stringify(array));
  window.localStorage.itemStorage = JSON.stringify(array);
}
//--------------------
//------- lancement de searchItem si:
// inputChecked true et Créer / Modifier
// inputChecked true et Enter
// inputChecked true et Supprimer
//--------------------

//------------
// RECHERCHE DE L'EXISTENCE DE L'ELEMENT exact SAISI et le cas échéant AFFICHAGE DANS LE FORMULAIRE
//------------
function searchItem() {
  console.log("recherche de son existence dans la liste storage");
  console.log("modifElement avant action: " + modifElement);
  console.log("taille array avant action: " + array.length);
  inputFound = false;
  let arrayEnd = array.length;
  for (let i = 0; i < arrayEnd; i++) {
    console.log("entrée dans la boucle de recherche dans tableau temp");
    console.log(
      "itemStock.itemName.toLowerCase : " + itemStock.itemName.toLowerCase()
    );
    console.log(
      "array[i].itemName.toLowerCase : " + array[i].itemName.toLowerCase()
    );
    if (array[i].itemName.toLowerCase() === itemStock.itemName.toLowerCase()) {
      console.log("array[i] trouvé : " + array[i].itemName + " i : " + i);
      inputFound = true;
      item.value = array[i].itemName;
      price.value = array[i].priceEstimation;
      place1.value = array[i].quantityStockage;
      place2.value = array[i].quantityCamion1;
      place3.value = array[i].quantityCamion2;
      place4.value = array[i].quantityClient;
      indexMemory = i;
      arrayEnd = 0;
    }
  }
  console.log("sortie boucle searchItem / inputFound : " + inputFound);
  if (inputFound === false) {
    console.log("Elément saisi non trouvé");
    message.innerHTML = `Elément saisi non trouvé`;
  }
}
//------------
// RECHERCHE DE L'ELEMENT CLIQUE DANS LA LISTE
//------------
function searchClicked() {
  console.log("searchClicked : " + itemStock.itemName);
  inputFound = false;
  let arrayEnd = array.length;
  for (let i = 0; i < arrayEnd; i++) {
    console.log("entrée dans la boucle de recherche de l'élément cliqué");
    console.log("array[i].itemName : " + array[i].itemName);
    console.log("itemStock.itemName : " + itemStock.itemName);
    if (array[i].itemName === itemStock.itemName) {
      console.log("array[i] trouvé : " + array[i].itemName + " i : " + i);
      inputFound = true;
      item.value = array[i].itemName;
      inputChecked = true;
      price.value = array[i].priceEstimation;
      place1.value = array[i].quantityStockage;
      place2.value = array[i].quantityCamion1;
      place3.value = array[i].quantityCamion2;
      place4.value = array[i].quantityClient;
      indexMemory = i;
      arrayEnd = 0;

      // Renseignement de ItemStock
      itemStock.itemName = array[i].itemName;
      itemStock.priceEstimation = array[i].priceEstimation;
      itemStock.quantityStockage = array[i].quantityStockage;
      itemStock.quantityCamion1 = array[i].quantityCamion1;
      itemStock.quantityCamion2 = array[i].quantityCamion2;
      itemStock.quantityClient = array[i].quantityClient;
    }
  }
  console.log("sortie boucle searchClicked / inputFound : " + inputFound);
  if (inputFound === false) {
    console.log("Elément cliqué non trouvé (bug)");
    message.innerHTML = `Elément cliqué non trouvé (bug, signaler à l'informatique)`;
  } else {
    message.innerHTML = `Modifier, supprimer ou réinitialiser`;
  }
}
//------------
// Refresh
//------------
function refresh() {
  item.value = "";
  place1.value = 0;
  place2.value = 0;
  place3.value = 0;
  place4.value = 0;
  price.value = 0;
  keyPressedValid = false;
  keyPressedEnter = false;
  keyPressedSuppr = false;
  keyPressedRech = false;
  keyPressedInit = false;
  keyPressedClicElement = false;
  message.innerHTML = `Renseigner le formulaire`;
  listDisplay();
}
//------------
// EXPORT DATA
//------------
function exportData() {
  if (optionComplete.checked) {
    console.log("exporter Liste Complete");
    console.log(array);
  } else if (optionStockageBureau.checked) {
    console.log("exporter Extrait Liste Stockage Bureau");
    console.log(array);
  } else if (optionCamion1.checked) {
    console.log("exporter Extrait Liste Camion1");
    console.log(array);
  } else if (optionCamion2.checked) {
    console.log("exporter Extrait Liste Camion2");
    console.log(array);
  } else if (optionClient.checked) {
    console.log("exporter Extrait Liste Clients");
    console.log(array);
  } else {
    console.log("exporter Liste Complete");
    console.log(array);
  }
}
