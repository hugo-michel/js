////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////        CONSTANTES & VARIABLES      ////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//classes des couleurs de fond pour le mode couleur
//greendefault permet de faire la difference entre le vert selectionné et le vert par defaut
const classColor = ["green", "yellow", "orange", "red", "greenDefaut"];
//recupération des inputs en nodelist
let notes = document.querySelectorAll(".note");
//liste des buttons pour passer d'un mode à un autre
//1button = 1 devoir
let button = document.querySelectorAll(".toggleMode");
//les regex pour les 2 modes
const regexCouleur = /^[1-4&é"']{1}$/;
const regexNote = /^[1-5&é"'(]{1}$/;
//variable pour colonne en cours
let x = 0;
//variable pour le nombre de colonne
let table = document.getElementById("table");
let nbCol = table.firstElementChild.firstElementChild.childElementCount - 1;
//button reset all
const resetAll = document.getElementById("resetAll");
//nodelist des btn reset par devoir
let btnReset = document.querySelectorAll(".resetDevoir");
//btn pour ajout d'un nouveau devoir (=colonne)
const addDevoir = document.getElementById("addDevoir");
//btn pour ajout d'un nouveau eleve (=ligne)
const addEleve = document.getElementById("addEleve");
//btn pour suppression eleve (=ligne)
let btnDelEleve = document.querySelectorAll(".delEleve");
//btn pour suppression des devoirs (=col)
let btnDelDevoir = document.querySelectorAll(".delDevoir");
//selec tous les champ editable (noms eleve et devoirs)
let contentEditable = document.querySelectorAll(".edit");
//array pour stocker les modes. mode 0 : base , mode 1 : note, mode 2 : couleur
let mode = [];
//ajout des modes pour chaque col, tous en mode 0 au depart
for (let i = 0; i < button.length; i++) {
    mode.push(0)
}
//sert à garder en memoire chaque fonction rattachées aux events click des resets devoirs => indispensables pour leurs removals plus tard !
let gestResetDevoir = [];
//sert à garder en memoire la ref de la fonction resetGeneral
let gestResetGeneral = [];
//sert à garder en memoire la ref de la fonction switchMode
let gestSwitchMode = [];
//sert à garder en memoire la ref de la fonction ajoutNote
let gestAjoutNote = [];
//sert à garder en memoire la ref de la fonction MajX (mise à jour num col)
let gestMajX = [];
//gestionnaire btns delEleve
let gestDelEleve = [];
//gest btns delDevoirs
let gestDelDevoir = [];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////        NOTATION => CHAMPS INPUT      //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//funct pour affichage input en mode couleur => evite repetitions de code ds funct ajoutNote
function affInputCouleur(element) {
    if (element.value == 1 || element.value == "&") {
        //boucle pour enlever les classes inutiles
        classColor.forEach(c => {
            if (element.classList.contains(c)) {
                element.classList.remove(c);
            }
        })
        element.classList.add("red");
        element.value = "";
    } else if (element.value == 2 || element.value == "é") {
        classColor.forEach(c => {
            if (element.classList.contains(c)) {
                element.classList.remove(c);
            }
        })
        element.classList.add("orange");
        element.value = "";
    } else if (element.value == 3 || element.value == "\"") {
        classColor.forEach(c => {
            if (element.classList.contains(c)) {
                element.classList.remove(c);
            }
        })
        element.classList.add("yellow");
        element.value = "";
    } else if (element.value == 4 || element.value == "\'") {
        classColor.forEach(c => {
            if (element.classList.contains(c)) {
                element.classList.remove(c);
            }
        })
        element.classList.add("green");
        element.value = "";
    };
}

//gere l'ajout des notes, funct nommée pour removeEvent plus tard
function handleAjoutNote(element, index) {
    return () => {
        //si mode couleur
        if (mode[index % nbCol] == 2) {
            //test de l'input avec regex
            let resultatCouleur = regexCouleur.test(element.value);
            //si input correct
            if (resultatCouleur) {
                const nextElement = element.parentElement.parentElement.nextElementSibling.children[x + 1].firstElementChild;
                //cas particulier si fin de colonne OU prochain element à deja une couleur/note => evite perte notes deja mise
                if ((element.parentElement.parentElement.nextElementSibling.nextElementSibling === null) ||
                    ((nextElement.classList.contains("red")) || (nextElement.classList.contains("orange"))
                        || (nextElement.classList.contains("yellow")) || (nextElement.classList.contains("green"))
                        || (!nextElement.value == ""))) {
                    affInputCouleur(element);
                    element.blur();
                    //cas général
                } else {
                    //focus au prochain element. children[x+1] permet de rester dans la bonne col.
                    affInputCouleur(element);
                    element.parentElement.parentElement.nextElementSibling.children[x + 1].firstElementChild.focus();
                }
                //si input incorrect
            } else {
                alert("invalide \nentrez un chiffre entre 1 et 4");
                element.value = "";
            }
        }
        //si mode note
        if (mode[index % nbCol] == 1) {
            //test input avec regex
            let resultatNote = regexNote.test(element.value);
            //switch pour changement valeurs & é " ' ( en 12345
            switch (element.value) {
                case "&":
                    element.value = 1;
                    break;
                case "é":
                    element.value = 2;
                    break;
                case "\"":
                    element.value = 3;
                    break;
                case "\'":
                    element.value = 4;
                    break;
                case "(":
                    element.value = 5;
                    break;
                default:
                    break;
            };
            //si input correct
            if (resultatNote) {
                const nextElement = element.parentElement.parentElement.nextElementSibling.children[x + 1].firstElementChild;
                //cas particulier si fin de colonne OU prochain element à deja une couleur/note => evite perte notes deja mise
                if ((element.parentElement.parentElement.nextElementSibling.nextElementSibling === null) ||
                    ((nextElement.classList.contains("red")) || (nextElement.classList.contains("orange"))
                        || (nextElement.classList.contains("yellow")) || (nextElement.classList.contains("green"))
                        || (!nextElement.value == ""))) {
                    element.blur();
                    //cas général
                } else {
                    //focus au prochaine element. children[x + 1] permet de rester dans la mm col.
                    element.parentElement.parentElement.nextElementSibling.children[x + 1].firstElementChild.focus();
                }
            }
            //si input invalide
            else {
                alert("invalide \nentrez un chiffre entre 1 et 5");
                element.value = "";
            }
        }
    }
}

//function ajout eventListener sur tous les inputs
function addEventAjoutNote() {
    notes.forEach((element, index) => {
        //reference de la fonction
        const fAjoutNote = handleAjoutNote(element, index);
        //ajout de la ref dans le gestionnaire
        gestAjoutNote.push(fAjoutNote);
        element.addEventListener("input", fAjoutNote);
    })
}

////function rm eventListener sur tous les inputs
function removeEventAjoutNote() {
    notes.forEach((element, index) => {
        //recuperation de la ref de la fonction ajoutée
        const fAjoutNote = gestAjoutNote[index];
        element.removeEventListener("input", fAjoutNote);
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////        SWITCH DE MODE PAR DEVOIR      /////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//function nommée pour switch de mode
function handleSwitchMode(btnindex) {
    return () => {
        //mise à jour de la col en cours
        x = (btnindex % nbCol);
        //si 1er el col n'est pas vide : emepche de "perdre" les notes deja mises
        if ((notes[x].classList.contains("red")) || (notes[x].classList.contains("orange"))
            || (notes[x].classList.contains("yellow")) || (notes[x].classList.contains("green"))
            || (!notes[x].value == "")) {
            alert("notes présentes pour ce devoir, veuillez reset le devoir avant de changer de mode");
        }
        else {
            //si aucun mode activé
            if (mode[btnindex] == 0) {
                button[btnindex].value = "note";
                mode[btnindex] = 1;
                //si le mode actuel est note
            } else if (mode[btnindex] == 1) {
                button[btnindex].value = "couleur";
                mode[btnindex] = 2;
                //si le mode actuel est couleur
            } else if (mode[btnindex] == 2) {
                button[btnindex].value = "note";
                mode[btnindex] = 1;
            };
            notes.forEach((element, index) => {
                //remove hidden des inputs (par defaut codé en dur en html)
                //la 2eme condition permet de ne modifier que la colonne en cours
                if ((mode[btnindex] == 1) && ((index % nbCol) == x)) {
                    element.removeAttribute("hidden");
                    classColor.forEach(c => {
                        if (element.classList.contains(c)) {
                            element.classList.remove(c);
                        }
                    })
                }
                //si mode couleur, passage en green
                //la 2eme condition permet de ne modifier que la colonne en cours
                else if ((mode[btnindex] == 2) && ((index % nbCol) == x)) {
                    element.removeAttribute("hidden");
                    classColor.forEach(c => {
                        if (element.classList.contains(c)) {
                            element.classList.remove(c);
                        }
                        element.classList.add("greenDefaut");
                    })
                }
            })
            //focus sur le premier champ de la col
            notes[x].focus();
        };
    }
}

//function pour ajout d'event sur les btn switch de mode
function addEventSwitchMode() {
    button.forEach((elementbtn, indexbtn) => {
        //ref de la funct, push dans le gestionnaire
        const fSwitchMode = handleSwitchMode(indexbtn);
        gestSwitchMode.push(fSwitchMode);
        elementbtn.addEventListener("click", fSwitchMode);
    })
}

//function pour remove d'event sur les btn switch de mode
function removeEventSwitchMode() {
    button.forEach((elementbtn, indexbtn) => {
        //recuperation de la ref
        const fSwitchMode = gestSwitchMode[indexbtn];
        elementbtn.removeEventListener("click", fSwitchMode);
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////        BOUTTON RESET ALL      /////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//function pour reset General
function handleResetGeneral() {
    return () => {
        if (window.confirm("ëtes vous sur de vouloir effacer toutes les notes ?")) {
            notes.forEach(element => {
                //reset des value
                element.value = "";
                //enleve les classes inutiles
                classColor.forEach(c => {
                    if (element.classList.contains(c)) {
                        element.classList.remove(c);
                    }
                    //repassage des inputs en hidden => force la selection d'un mode
                    element.setAttribute("hidden", "");
                })
            })
            //remise à zero de la col en cours & du texte des btn switchMode
            x = 0;
            button.forEach(element => {
                element.value = "mode";
            })
            //selection de tous les noms de devoirs
            const ligneNomDevoir = document.querySelector("#table tr:nth-child(2)");
            const nomsDevoirs = ligneNomDevoir.querySelectorAll("td:not(:first-child)");
            //remise à la value de base Devoir
            nomsDevoirs.forEach(e => {
                //bourrin mais osef.
                e.innerHTML = '<input type="button" class="delDevoir" value="X"><span contenteditable spellcheck="false" class="edit">Devoir</span>';
            });
            //selection de tous les noms d'eleves
            const lignesTR = document.querySelectorAll("tr:not(:first-child):not(:nth-child(2)):not(:last-child)");
            //transformation de la nodelist en list classique.
            const premiereColonneTDs = Array.from(lignesTR).map(ligne => ligne.querySelector("td:nth-child(1)"));
            //remise à la value de base "Eleve" de tous les noms
            premiereColonneTDs.forEach(e => {
                // bourrin mais osef
                e.innerHTML = '<input type="button" class="delEleve" value="X"><span contenteditable spellcheck="false" class="edit">Eleve</span>'
            });
            //selec des btn DeleteEleve (à faire là car il est possible que d'autres eleve ont été ajouté par AddEleve)
            btnDelEleve = document.querySelectorAll(".delEleve");
            // ajout des eventListener sur tous les btns. Pas besoin de fonction remove, 
            // la multiplication des ecouteurs n'entrainent pas de bug car à la suppression de la ligne le btn (et ses ecouteurs associés) sont supprimés.
            AddEventDelEleve();
            //selec des editables. doit etre fait car il est possible que d'autres lignes est été ajoutée.
            contentEditable = document.querySelectorAll(".edit");
            //ajout des events. pas besoin de remove, cf au dessus.
            EventContentEditable()
            //cf au dessus
            btnDelDevoir = document.querySelectorAll(".delDevoir");
            addEventDelDevoir();
        }
    }
}

//function pour ajout de event resetGeneral
function addEventResetGeneral() {
    //garde et push la ref de le func
    const fResetGeneral = handleResetGeneral();
    gestResetGeneral.push(fResetGeneral);
    resetAll.addEventListener("click", fResetGeneral);
}

//function pour remove de event resetGeneral
function removeEventResetGeneral() {
    //1seul btn = 1 seule func => index 0
    const fResetGeneral = gestResetGeneral[0];
    resetAll.removeEventListener("click", fResetGeneral);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////        RESET PAR DEVOIR        ////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//fonction nommée pour le reset d'un devoir. INDISPENSABLE pour pouvoir remove l'event plus tard.
function handleResetDevoir(indexbtn) {
    return () => {
        //index col en cours = index du btnReset
        x = indexbtn;
        //Pour affichage du nom de devoir dans l'alert de confirmation
        let nomDevoir = notes[x].parentElement.parentElement.previousElementSibling.children[x + 1].textContent;
        if (window.confirm(`êtes vous sur de vouloir effacer les notes du ${nomDevoir} ?`)) {
            //changement texte btn
            button[indexbtn].value = "mode";
            //changement du mode de la col
            mode[indexbtn] = 0;
            notes.forEach((element, index) => {
                // colonne en cours en fonction du btn
                if ((index % nbCol) == x) {
                    element.value = "";
                    //remise en hidden des inputs => force choix d'un mode
                    element.setAttribute("hidden", "");
                    classColor.forEach(c => {
                        if (element.classList.contains(c)) {
                            element.classList.remove(c);
                        }
                    })
                }
            })
            //remet à la valeur de départ le nom du devoir.           
            notes[x].parentElement.parentElement.previousElementSibling.children[x + 1].innerHTML = '<input type="button" class="delDevoir" value="X"><span contenteditable spellcheck="false" class="edit">Devoir</span>';
            //pas de rm, change rien.
            contentEditable = document.querySelectorAll(".edit");
            EventContentEditable();
            //rm puis add events delDevoir
            removeEventDelDevoir();
            btnDelDevoir = document.querySelectorAll(".delDevoir");
            gestDelDevoir = [];
            addEventDelDevoir();
        }
    }
}

//function pour ajouter à chaque btnReset l'event
function addEventResetDevoir() {
    btnReset.forEach((elementbtn, indexbtn) => {
        //stocke dans gestResetDevoir les fonctions pour leur suppression ulterieure
        //NECESSITE une ref unique, sinon js considere que ce sont des focntions differentes => impossible de remove
        const fResetDevoir = handleResetDevoir(indexbtn);
        gestResetDevoir.push(fResetDevoir)
        //ajout de la fonction
        elementbtn.addEventListener("click", fResetDevoir)
    })
}

//funct pour remove de chaque event
function removeEventResetDevoir() {
    btnReset.forEach((elementbtn, indexbtn) => {
        //necessaire pour avoir la même ref de fonction
        const fResetDevoir = gestResetDevoir[indexbtn];
        elementbtn.removeEventListener("click", fResetDevoir)
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////        MAJ DE X = COL EN COURS       //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//func pour Maj col en cours en cas de clic sur input > evite bug autofocus etc
function handleMajX(index) {
    return () => {
        x = index % nbCol;
    }
}

//func ajout event sur tous les inputs
function addEventMajX() {
    notes.forEach((element, index) => {
        const fMajX = handleMajX(index);
        gestMajX.push(fMajX);
        element.addEventListener("click", fMajX);
    })
}

//func rm events sur tous les inputs
function removeEventMajX() {
    notes.forEach((element, index) => {
        const fMajX = gestMajX[index];
        element.removeEventListener("click", fMajX);
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////        AJOUT DE DEVOIR (= COL)       //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//fonction pour ajout d'un devoir dans le HTML
function ajoutcol() {
    //ajoute le btn pour chgmt de mode, ac attribute necessaire
    const firstTr = document.querySelector("#table tr:first-child");
    const celluleMode = document.createElement("td");
    const newBtnMode = document.createElement("input");
    newBtnMode.setAttribute("type", "button");
    newBtnMode.setAttribute("class", "toggleMode");
    newBtnMode.setAttribute("value", "mode");
    celluleMode.appendChild(newBtnMode);
    firstTr.appendChild(celluleMode);

    //ajoute nom du devoir, provisoire pour eviter bug aff ds fonction resetDevoir
    const secondTr = document.querySelector("#table tr:nth-child(2)");
    const celluleNom = document.createElement("td");
    celluleNom.innerHTML = '<input type="button" class="delDevoir" value="X"><span contenteditable spellcheck="false" class="edit">Devoir</span>'
    secondTr.appendChild(celluleNom);

    //ajout btn pour reset du devoir ac attributes necessaires
    const lastTr = document.querySelector("#table tr:last-child");
    const newBtnReset = document.createElement("input");
    const celluleReset = document.createElement("td");
    newBtnReset.setAttribute("type", "button");
    newBtnReset.setAttribute("class", "resetDevoir");
    newBtnReset.setAttribute("value", "Reset");
    celluleReset.appendChild(newBtnReset);
    lastTr.appendChild(celluleReset);

    //selection des lignes eleves
    let ligneEleve = document.querySelectorAll('#table tr:not(:first-child):not(:nth-child(2)):not(:last-child)')
    //ajout d'un champ inputs pour chaque ligne, ac attributes requis
    ligneEleve.forEach(function (e) {
        let celluleEleve = document.createElement("td");
        let newNote = document.createElement("input");
        newNote.setAttribute("type", "tel");
        newNote.setAttribute("class", "note");
        newNote.setAttribute("hidden", "");
        celluleEleve.appendChild(newNote);
        e.append(celluleEleve);
    });

    //recalcul des variables necessaire au script car nodelist sont STATIC
    table = document.getElementById("table");
    //ABSOLUMENT INDISPENSABLE DE RM LES EVENTS DE CES DEUX FONCTIONS AVANT LE RECALCUL DE NOTES. 
    //AUCUNE IDEE DE POURQUOI CES TROIS LA ET PAS LES AUTRES MAIS OSEF CA MARCHE
    removeEventMajX();
    removeEventAjoutNote();
    removeEventDelDevoir();

    btnDelDevoir = document.querySelectorAll(".delDevoir");
    notes = document.querySelectorAll(".note");
    button = document.querySelectorAll(".toggleMode");
    nbCol = table.firstElementChild.firstElementChild.childElementCount - 1;
    btnReset = document.querySelectorAll(".resetDevoir");
    //ajout d'un mode 0 pour la col créée
    mode.push(0);
    contentEditable = document.querySelectorAll(".edit");
}

//ajout d'un nouveau devoir (=une new col)
addDevoir.addEventListener("click", () => {
    //appel de la fonction pour création des nouveaux elements HTML
    ajoutcol();
    //remise à zero du tableau de stockage, new events sur chaque inputs
    gestAjoutNote = [];
    addEventAjoutNote();
    gestDelDevoir = [];
    addEventDelDevoir();
    //remise à zero du tableau de stockage, new events sur chaque inputs
    gestMajX = [];
    addEventMajX();
    //DOIT ABSOLUMENT ETRE APPELLE DANS CET ORDRE : remove des events existants => remise à 0 du tableau de stockage => push des nouveaux events en stockage
    //remove des events clicks pour tous les bouttons resetDevoir (=btnReset)
    removeEventResetDevoir();
    //remise à 0 du tableau de stockage des fonctions associées
    gestResetDevoir = [];
    //fonction pour ajoute les events à chaque btn resetDevoir
    addEventResetDevoir();
    //DANS CET ORDRE, IDEM QUE POUR resetDevoir
    removeEventResetGeneral();
    gestResetGeneral = [];
    addEventResetGeneral();
    //DANS CET ORDRE, IDEM QUE POUR resetDevoir
    removeEventSwitchMode();
    gestSwitchMode = [];
    addEventSwitchMode();
    //pas de rm, change rien.
    EventContentEditable()
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////        AJOUT D'ELEVE (= LIGNE)       //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//function pour ajout eleve
function ajoutLigne() {
    //selec la 1ere ligne eleve
    const ligneACopier = document.querySelector("#table tr:nth-child(3)");
    //selec derniere ligne table
    const lastTr = document.querySelector("#table tr:last-child");
    //copie la ligne
    const newEleve = ligneACopier.cloneNode(true);
    //insert la copie avant la derniere ligne
    lastTr.insertAdjacentElement("beforebegin", newEleve);
    //selec tous les inputs de la nouvelle ligne
    const newEleveInputs = newEleve.querySelectorAll("td:not(:first-child) input.note");
    //rm classes inutiles, remise à zero des values
    //necessaire pour empecher la copie des values/color deja mises dans la premiere ligne eleve
    newEleveInputs.forEach(e => {
        classColor.forEach(c => {
            if (e.classList.contains(c)) {
                e.classList.remove(c);
            }
        })
        e.value = "";
    })
    //ajoute le nom de base "eleve" ainsi que le btn de supp de l'eleve à la nouvelle ligne
    newEleve.querySelector("td:first-child").innerHTML = '<input type="button" class="delEleve" value="X"><span contenteditable spellcheck="false" class="edit">Eleve</span>';
    //remise à zero des events, recalcul des variables etc.
    //même raison que pour ajoutCol()
    removeEventMajX();
    removeEventAjoutNote();
    removeEventDelEleve();
    notes = document.querySelectorAll(".note");
    button = document.querySelectorAll(".toggleMode");
    nbCol = table.firstElementChild.firstElementChild.childElementCount - 1;
    btnReset = document.querySelectorAll(".resetDevoir");
    btnDelEleve = document.querySelectorAll(".delEleve");
    contentEditable = document.querySelectorAll(".edit");
}

//ajout des events, idem que addDevoir
addEleve.addEventListener("click", () => {
    ajoutLigne();
    gestDelEleve = [];
    AddEventDelEleve();
    gestAjoutNote = [];
    addEventAjoutNote();
    //remise à zero du tableau de stockage, new events sur chaque inputs
    gestMajX = [];
    addEventMajX();
    //DOIT ABSOLUMENT ETRE APPELLE DANS CET ORDRE : remove des events existants => remise à 0 du tableau de stockage => push des nouveaux events en stockage
    //remove des events clicks pour tous les bouttons resetDevoir (=btnReset)
    removeEventResetDevoir();
    //remise à 0 du tableau de stockage des fonctions associées
    gestResetDevoir = [];
    //fonction pour ajoute les events à chaque btn resetDevoir
    addEventResetDevoir();
    //DANS CET ORDRE, IDEM QUE POUR resetDevoir
    removeEventResetGeneral();
    gestResetGeneral = [];
    addEventResetGeneral();
    //DANS CET ORDRE, IDEM QUE POUR resetDevoir
    removeEventSwitchMode();
    gestSwitchMode = [];
    addEventSwitchMode();
    //pas rm, change rien.
    EventContentEditable()
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////        DELETE ELEVE       /////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//delete la ligne 
function handeleDelEleve(element) {
    return () => {
        const ligneADel = element.parentElement.parentElement;
        const nomEleve = element.nextElementSibling.textContent;
        if (window.confirm(`etes vous sur de vouloir supprimer ${nomEleve} ?`)) {
            ligneADel.remove();
        }
    }
}

//fucntion pour ajout de l'event sur chaque btn de delEleve
function AddEventDelEleve() {
    btnDelEleve.forEach((element, index) => {
        const fDelEleve = handeleDelEleve(element, index)
        gestDelEleve.push(fDelEleve);
        element.addEventListener("click", fDelEleve);
    })
}

//func pour remove ecouteurs
function removeEventDelEleve() {
    btnDelEleve.forEach((element, index) => {
        const fDelEleve = gestDelEleve[index];
        element.removeEventListener("click", fDelEleve);
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////        GESTION CONTENT EDITABLE       /////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//emepche le saut de ligne + perte focus sur touche entrée
function EventContentEditable() {
    contentEditable.forEach(element => {
        element.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                element.blur();
            }
        })
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////        DELETE DEVOIR (=COL)      //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function handleDelDevoir(element, index) {
    return () => {
        //selection de la col à supprimer
        x = index % nbCol;
        const nomDevoir = element.nextElementSibling.textContent;
        if (window.confirm(`etes vous sur de vouloir supprimer ${nomDevoir} ?`)) {
            //bcle pour supprimer toute les cell de la col
            for (let i = 0; i < table.rows.length; i++) {
                let ligne = table.rows[i];
                ligne.deleteCell(x + 1);
            }
            //remove du mode pour la col supprimé
            mode.splice(index, 1);
            //eneleve les events des boutons
            removeEventDelDevoir();
            //recalcul de la liste des btns DelDevoirs
            btnDelDevoir = document.querySelectorAll(".delDevoir");
            //remise à zero du tableau
            gestDelDevoir = [];
            //calcul du nbCol
            nbCol = table.firstElementChild.firstElementChild.childElementCount - 1;
            //remise des ecouteurs delDevoir
            addEventDelDevoir();
            //on supprime tous les events existants sur les cjhamps inputs
            removeEventAjoutNote();
            //rm events majX
            removeEventMajX();
            //recalcul de la liste des inputs note
            notes = document.querySelectorAll(".note");
            //remise à zero du stockage des func pour addNotes
            gestAjoutNote = [];
            //ajout des events AddNotes
            addEventAjoutNote();
            //remise à zero du gest, add events majX
            gestMajX = [];
            addEventMajX();
            //remove des events pour switchMode
            removeEventSwitchMode();
            //calcul de la new liste des btns switchMode
            button = document.querySelectorAll(".toggleMode");
            //remise à zero stockage func + ajouts des nouveaux events
            gestSwitchMode = [];
            addEventSwitchMode();
            //rm events DelDevoir existants
            removeEventResetDevoir();
            //reselec des btns reset
            btnReset = document.querySelectorAll(".resetDevoir");
            //reset du gest + add events
            gestResetDevoir = [];
            addEventResetDevoir();
        }
    }
}

function addEventDelDevoir() {
    btnDelDevoir.forEach((element, index) => {
        const fDelDevoir = handleDelDevoir(element, index);
        gestDelDevoir.push(fDelDevoir);
        element.addEventListener("click", fDelDevoir);
    })
}

function removeEventDelDevoir() {
    btnDelDevoir.forEach((element, index) => {
        const fDelDevoir = gestDelDevoir[index];
        element.removeEventListener("click", fDelDevoir);
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////        PREMIER LOAD       /////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//au chargement de la page : appel des fonctions pour ajouter les events sur btn SwitchMode, inputsNotes, ResetGe, resetDevoir, majColEnCours, DelEleve, contenteditable, DelDevoir
window.onload = addEventSwitchMode(), addEventAjoutNote(), addEventResetGeneral(), addEventResetDevoir(), addEventMajX(), AddEventDelEleve(), EventContentEditable(), addEventDelDevoir();
