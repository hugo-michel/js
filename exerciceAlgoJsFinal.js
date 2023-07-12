// // exo 01 : inverser une chaine de caractere

// function reverse(text) {
//     let reverseText = "";
//     for (i = text.length - 1; i >=0; i--) {
//         reverseText += text[i];
//     }
//     return reverseText
// }

// console.log(reverse("la mairie"))


/////////////////////////////////////////////////////////////////////////

// exo 02 : compter le nombre de mots dans une phrase

// function nombreMot(text) {
//     let nombreEspace = 0;
//     for (let i = 0; i < text.length; i++) {
//         if (text[i] == " ") {
//             nombreEspace += 1;
//         }
//     }
//     return (nombreEspace +1)

// }

// let reponse = nombreMot("un homme se ballade en ville en janvier")

// console.log(` la phrase comporte ${reponse} mots`)

// //solution avec .split
// // let text = "le chat et le chien";
// // text = text.split(" ");
// // console.log(text.length)

/////////////////////////////////////////////////////////////////////////

// exo 03 + 04 : verifier si un mot ou une phrase est un palindrome

// // inverse le text
// function reverse(text) {
//     let reverseText = "";
//     for (i = text.length - 1; i >=0; i--) {
//         reverseText += text[i];
//     }
//     return reverseText
// }

// //passe le prompt en minuscule et verifie le palindrome
// function palindrome(text) {
//     text = text.toLowerCase();
//         if (text == (reverse(text)))  {
//             alert("le texte est un palindrome");
//         } else {
//             alert("le texte n'est pas un palindrome");
//         }
// }

// //enleve les espaces : pour les phrases en palindrome (ex : Rions noir // Karine alla en Irak)
// function sup_espace(text) {
//     let text_sans_espace = ""
//     for (let i = 0; i < text.length; i++) {
//         if (text[i] != " ") {
//             text_sans_espace = text_sans_espace + text[i];
//         }
//     }
//     return text_sans_espace;
// }

// let text = prompt("entrez votre texte : ");
// text = sup_espace(text);
// palindrome(text);

////////////////////////////////////////////////////////////////////////////

// // exo 05 : afficher une table de multiplication

// function multiplication(chiffre, max) {
//     for (let i = 0; i <= max; i++) {
//         let resultat = 0;
//         resultat = i * chiffre;
//         console.log(`${chiffre} * ${i} = ${resultat}`);
//     };
// };
// multiplication(8, 10)

//////////////////////////////////////////////////////////////////////////////

// exo 06 : verifier si un chiffre est divisible par 3

// const divisiblePar3 = (number) => {
//     return (number % 3) == 0 ? console.log(`${number} est divisible par 3`) : console.log(`${number} n'est pas divisible par 3`);
// };

// divisiblePar3(28)
// divisiblePar3(33)

///////////////////////////////////////////////////////////////////////////////

// exo 07 : verifier si un chiffre est pair ou impair

// const oddEven = (number) => {
//     return (number % 2) == 0 ? console.log(`${number} est pair`) : console.log(`${number} est impair`);
// };

// oddEven(8)
// oddEven(27)

////////////////////////////////////////////////////////////////////////////

// exo 08 : demander l'age d'un utilisateur, verifier que c'est un chiffre, sinn dire que ce n'est pas un chiffre

// // FOnctionne
// const numberCheck = (number) => {
//     return (typeof number == "number") ? console.log((`vous avez ${number} ans`)) : console.log((`${number} n'est pas un chiffre`));
// };
// let age = "hugo";
// numberCheck(age);
// age = 34;
// numberCheck(age);

// // focntionne
// let age = "hugo";
// if (typeof age == "number") {
//     alert("ok");
// } else { alert("pas ok")}

// // ne fonctionne pas ???
// const numberCheck = (test) => {
//     if (typeof test == "number") {
//         alert("ok");
//     } else {alert("pas ok");}
// };
// let age = prompt("Quel est votre age ? ");
// numberCheck(age);

// ne fonctionne pas pour hugo : test est transformé en int... ou en NaN ? affiche pour hugo : vous avez NaN ans >>>> le typeof NaN est number. FU js.
// const numberCheck = (test) => {
//     (typeof test == "number") ? alert(`vous avez ${test} ans`) : alert(`${test} n'est pas un chiffre`);
// };
// let age = prompt("Quel est votre age ? ");
// age = parseInt(age);
// numberCheck(age);

// FONCTIONNE mais affiche pour "hugo" : NaN n'est pas un chiffre si j'essaye d'afficher le mot originalement tapé (logique, rien d'anormal du tout)
// const numberCheck = (test) => {
//     (Number.isNaN(test)) ? alert(`Ce n'est pas un chiffre`) : alert(`${test} est un chiffre`);
// };
// let age = prompt("Quel est votre age ? ");
// age = parseInt(age);
// numberCheck(age);

// let test = "hugo";
// test = parseInt(test);
// console.log(test);
// console.log(typeof test);
// if (Number.isNaN(test)) {
//     console.log("test est n'est pas unchiffre")
// } else {console.log("test est un chiffre")}

// fonctionne mais accepte les chiffres <0
// const numberCheck = (test) => {
//     let testOriginal = test;
//     test = parseInt(test);
//     (Number.isNaN(test)) ? alert(`${testOriginal} n'est pas un chiffre`) : alert(`${test} est un chiffre`);
// };
// let age = prompt("Quel est votre age ? ");
// numberCheck(age);

// fonctionne pas : si test = 21hugo > 21 est un age valide ????????? apparemment parseInt("21hugo") renvoie un number de valeur 21, disparition de hugo.
// const numberCheck = (test) => {
//     let testOriginal = test;
//     test = parseInt(test);
//     (Number.isNaN(test)) ? alert(`${testOriginal} n'est pas un chiffre`) : (test >= 0) ? alert(`${test} est un age valide`) : alert(`l'age ne peut pas être inférieur à 0`);
// };
// let age = prompt("Quel est votre age ? ");
// numberCheck(age);

// let x = "21hugo32"
// console.log(x);             //21hugo32
// console.log(typeof(x))      //string
// x = parseInt(x);
// console.log(typeof(x))      //number
// console.log(x);             //21
// let y = "hugo"
// console.log(y);             //hugo
// console.log(typeof(y))      //string
// y = parseInt(y);
// console.log(typeof(y))      //number             ?????
// console.log(y);             //NaN
// let z = "21"
// console.log(z);             //21
// console.log(typeof(z))      //string
// z = parseInt(z);
// console.log(typeof(z))      //number
// console.log(z);             //21

// let x = "21hugo"
// console.log(x);             //21hugo
// console.log(typeof(x))      //string
// x = parseFloat(x);
// console.log(typeof(x))      //number
// console.log(x);             //21
// let y = "hugo"
// console.log(y);             //hugo
// console.log(typeof(y))      //string
// y = parseFloat(y);
// console.log(typeof(y))      //number
// console.log(y);             //NaN
// let z = "21"
// console.log(z);             //21
// console.log(typeof(z))      //string
// z = parseFloat(z);
// console.log(typeof(z))      //number
// console.log(z);             //21

// let x = "21hugo"
// console.log(x);             //21hugo
// console.log(typeof(x))      //string
// x = Number(x);
// console.log(typeof(x))      //number
// console.log(x);             //NaN
// let y = "hugo"
// console.log(y);             //hugo
// console.log(typeof(y))      //string
// y = Number(y);
// console.log(typeof(y))      //number
// console.log(y);             //NaN
// let z = "21"
// console.log(z);             //21
// console.log(typeof(z))      //string
// z = Number(z);
// console.log(typeof(z))      //number
// console.log(z);             //21

// let k = " ";                   
// console.log(k);                 //
// console.log(typeof(k));         //string
// k = Number(k);
// console.log(k);                 //0                 WTF
// console.log(typeof(k));         //number            evidemment.


// //fonctionne PAS avec un espace. espace + hugo fonctionne (>n'est pas un chiffre), espace seul renvoit 0 (Number(" ") = 0)
// const numberCheck = (test) => {
//     let testOriginal = test;
//     test = Number(test);
//     (Number.isNaN(test)) ? alert(`${testOriginal} n'est pas un chiffre`) : (test >= 0) ? alert(`${test} est un age valide`) : alert(`l'age ne peut pas être inférieur à 0`);
// };
// let age = prompt("Quel est votre age ? ");
// numberCheck(age);

//fonctionne mais aussi avec espace34 par exemple, Number(esp34) = 34...
// const numberCheck = (test) => {
//     let testOriginal = test;
//     test = Number(test);
//     (Number.isNaN(test)) ? alert(`${testOriginal} n'est pas un chiffre`) : (test > 0) ? alert(`${test} est un age valide`) : alert(`l'age ne peut pas être inférieur à 0`);
// };
// let age = prompt("Quel est votre age ? ");
// numberCheck(age);

// // Fonctionne, verifie les epsaces aussi
// const numberCheck = (test) => {
//     let regex = /\s/g;
//     let testOriginal = test;
//     test = Number(test);
//     (regex.test(testOriginal)) ? alert(`${testOriginal} n'est pas valide, PAS D'ESPACE SVP !`) :  
//     (Number.isNaN(test)) ? alert(`${testOriginal} n'est pas un chiffre`) : 
//     (test > 0) ? alert(`${test} est un age valide`) : alert(`l'age ne peut pas être inférieur à 0`);
// };
// let age = prompt("Quel est votre age ? ");
// numberCheck(age);

// //quitte à utiliser un regex
// const numberCheck = (str) => {
//     const regex = /^(\d+)$/g;
//     let resultat = regex.test(str);
//     resultat ? alert(`${str} est un age valide`) : alert(`${str} n'est pas un age valide`);
// };
// let age = prompt("Quel est votre age ? ");
// numberCheck(age);

//////////////////////////////////////////////////////////////////////////////

// exo 09 : demander l'age, transformer sa reponse en chiffre si necessaire

////////////////////////////////////////////////////////////////////////////////

// exo 10 : trouver le mot le plus fréquent dans une phrase

// const motLePlusFreq = (text) => {
//     text = text.split(" ")
//     let result = {};
//     let maxOcc = 0;
//     let motLePlusFreq = "";
//     for (let i = 0; i < text.length; i++) {
//         if ((text[i] in result) && (text[i] !== " ")) {
//             result[text[i]] += 1;
//         } else if (text[i] !== " ") {
//             result[text[i]] = 1;
//         }
//         if (result[text[i]] > maxOcc) {
//             maxOcc = result[text[i]];
//             motLePlusFreq = text[i]
//         }
//     };
//     return [motLePlusFreq, maxOcc]
// }

// let text = "le chat et le chien sont dans le magasin";
// let resultat = motLePlusFreq(text);
// console.log(`le mot le plus frequent dans la phrase "${text}" est "${resultat[0]}", il apparait ${resultat[1]} fois. `);


/////////////////////////////////////////////////////////////////////////////////

// exo 11 : trouver le plus long mot d'une phrase 

// function motPlusLongDansPhrase(text) {
//     let textDecoupe = text.split(" ");
//     let longueur = 0;
//     let motLePlusLong = ""
//     for (let i = 0; i < textDecoupe.length; i++) {
//         if (textDecoupe[i].length > longueur) {
//             longueur = textDecoupe[i].length;
//             motLePlusLong = textDecoupe[i];
//         }
//     }
//     return [motLePlusLong, longueur]
// }

// resultat = motPlusLongDansPhrase("un homme se promène en ville en janvier à Singapour");
// console.log(`le mot le plus long est "${resultat[0]}", il fait ${resultat[1]} lettres`);

/////////////////////////////////////////////////////////////////////////////////

// exo 12 : trouver le caractere le plus frequent dans une chaine 
// const characLePlusFreq = (text) => {
//     let result = {};
//     let maxOcc = 0;
//     let characLePlusFreq = "";
//     for (let i = 0; i < text.length; i++) {
//         if ((text[i] in result) && (text[i] !== " ")) {
//             result[text[i]] += 1;
//         } else if (text[i] !== " ") {
//             result[text[i]] = 1;
//         }
//         if (result[text[i]] > maxOcc) {
//             maxOcc = result[text[i]];
//             characLePlusFreq = text[i]
//         }
//     };
//     return [characLePlusFreq, maxOcc]
// }

// let text = "abracadabra";
// let resultat = characLePlusFreq(text);
// console.log(`le charactère le plus frequent de la chaine "${text}" est "${resultat[0]}", il apparait ${resultat[1]} fois. `);

/////////////////////////////////////////////////////////////////////////////////

// exo 13 : compter le nb d'occurences d'un mot dans une phrase

// const countOccurrences = (str, substr) => {
//     const regex = new RegExp(substr, 'g');
//     const matches = str.match(regex);
//     return matches ? matches.length : 0;
// };

// // const countOccurrences = (str, substr) => {
// //     const regex = new RegExp(substr, 'g');
// //     const matches = str.match(regex);
// //     if (matches) {
// //         return matches.length;
// //     } else {
// //         return 0;
// //     }
// // }

// console.log(countOccurrences("le chat et le chien sont partis dans le magasin", "le"))


///////////////////////////////////////////////////////////////////

// exo 14 : regex email valide

// function verifEmails (str) {
//     const regex = /[a-zA-Z0-9-_.]+@{1}[a-zA-Z0-9-_.]+\.[a-zA-Z]+/g;
//     console.log(regex.test(str));
// };

// function verifEmails (str) {
//     const regex = /[a-zA-Z0-9-_.]+@{1}[a-zA-Z0-9-_.]+\.[a-zA-Z]+/g;
//     let resultat = regex.test(str);
//     return resultat ? console.log(`${str} est un email valide`) : console.log(`${str} n'est pas un email valide`);
// };

// verifEmails("orayito62@gmail.com");
// verifEmails("@dhzaidahua.com");

/////////////////////////////////////////////////////////////////////////

// exo 15 : regex num telephone valide

// function verifTelephone (numbers) {
//     const regex = /0{1}[1-9]{9}/g;
//     console.log(regex.test(numbers));
// }

// function verifTelephone (numbers) {
//     const regex = /0{1}[1-9]{9}/g;
//     let resultat = regex.test(numbers);
//     return resultat ? console.log("numero valide") : console.log("numero non valide");

// };

// function verifTelephone (numbers) {
//     const regex = /^(0{1}[1-9]{9})/g;
//     let resultat = regex.test(numbers);
//     return resultat ? console.log(`${numbers} est un numero valide`) : console.log(`${numbers} n'est pas un numero valide`);

// };

// verifTelephone("0647957269")
// verifTelephone("1584753695")
// verifTelephone("0321hdeidaua")
// verifTelephone("47957269")
// verifTelephone("0321759484")
// verifTelephone("heuazhie0647957269eaeazea")
// verifTelephone("heuazhie0647957269eaeazea0321759484")

//////////////////////////////////////////////////////////////////////////////

// exo 16 : calculer la frequence d'apparition de chaque caract dans une chaine
// for (let i = 0; i < text.length; i++) {
//     let occ = countOccurrences(text, text[i]);
//     console.log(`${text[i]} : ${occ}`);
// }

// const countOccurrences = (str, substr) => {
//     const regex = new RegExp(substr, 'g');
//     const matches = str.match(regex);
//     return matches ? matches.length : 0;
// };

// let text = "le chat et le chien sont dans le magasin";
// let result = {};
// for (let i = 0; i < text.length; i++) {
//     let occ = countOccurrences(text, text[i]);
//     if (text[i] in result) {
//         result[text[i]] += 1;
//     } else {
//         result[text[i]] = 1;
//     }
// }
// console.log(result);

// let text = "le chat et le chien sont dans le magasin";
// let result = {};
// for (let i = 0; i < text.length; i++) {
//     if ((text[i] in result) && (text[i] !== " ")) {
//         result[text[i]] += 1;
//     } else if (text[i] !== " "){
//         result[text[i]] = 1;
//     }
// }
// console.log(result);

//fonctionne
// const freqCharac = (text) => {
//     let result = {};
//     for (let i = 0; i < text.length; i++) {
//         if ((text[i] in result) && (text[i] !== " ")) {
//             result[text[i]] += 1;
//         } else if (text[i] !== " ") {
//             result[text[i]] = 1;
//         }
//     };
//     return result;
// }
// console.log(freqCharac("abracadabra"));
// console.log(freqCharac("le chat et le chien sont dans le magasin"));




///////////////////////////////////////////////////////////////////////////////

// // exo 17 : Créer un objet etudiant avec un tableau d'objet etudiant dedans avec 5
// etudiants, chaque objet aura le nom de l'etudiant, et un objet notes avec les
// notes de maths, de sciences, de français et de sport. Ensuite nous demandons
// à l'utilisateur quels est la moyenne de classe qu'il souhaite afficher. Et nous
// affichons la moyenne.

// let etudiant = [
//     {
//         nom : "hugo",
//         notes : {
//             math: 15,
//             svt: 14,
//             francais: 13,
//             sport: 12
//         }
//     },
//     {
//         nom : "albert",
//         notes : {
//             math: 12,
//             svt: 11,
//             francais: 10,
//             sport: 9
//         }
//     },
//     {
//         nom : "eugene",
//         notes : {
//             math: 8,
//             svt: 7,
//             francais: 6,
//             sport: 5
//         }
//     },
//     {
//         nom : "foobar",
//         notes : {
//             math: 20,
//             svt: 19,
//             francais: 18,
//             sport: 17
//         }
//     },
//     {
//         nom : "lorem",
//         notes : {
//             math: 5,
//             svt: 4,
//             francais: 3,
//             sport: 2
//         }
//     }
// ]

// let moyenne = 0;
// let total = 0;
// for (let i = 0; i < etudiant.length; i ++) {
//     total += (etudiant[i]["notes"]["francais"])
//     moyenne = total / etudiant.length
    
// }
// console.log(moyenne)

// const moyenneMatiere = (matiere) => {
//     let moyenne = 0;
//     let total = 0;
//     for (let i = 0; i < etudiant.length; i++) {
//         total += (etudiant[i]["notes"][`${matiere}`]);
//         moyenne = total / etudiant.length;
//     }
//     return moyenne;
// }
// console.log(moyenneMatiere("svt"));

// //focntionne dans la console, en modifiant la matiere dans le resultat
// const moyenneMatiere = (matiere) => {
//     let moyenne = 0;
//     let total = 0;
//     for (let i = 0; i < etudiant.length; i++) {
//         total += (etudiant[i]["notes"][`${matiere}`]);
//         moyenne = total / etudiant.length;
//     }
//     return [matiere,moyenne]
// }
// let resultat = moyenneMatiere("svt");
// console.log(`la moyenne de classe de ${resultat[0]} est ${resultat[1]} / 20`)

// // fonctionne dans le navigateur
// const moyenneMatiere = (matiere) => {
//     let moyenne = 0;
//     let total = 0;
//     for (let i = 0; i < etudiant.length; i++) {
//         total += (etudiant[i]["notes"][`${matiere}`]);
//         moyenne = total / etudiant.length;
//     }
//     return moyenne;
// }
// let matiere = prompt("quelle moyenne de classe souhaitez vous ? (math, svt, francais, sport) ");
// let resultat = moyenneMatiere(matiere);
// alert(`la moyenne de classe de ${matiere} est ${resultat} / 20`)