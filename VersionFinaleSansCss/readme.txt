- L'application fonctionne peu importe le nombre d'élèves ou de devoirs.
Les noms des devoirs et des elèves peuvent être modifiés en cliquant sur les textes correspondants. (la touche entrée faire perdre le focus pour eviter les sauts de lignes inutiles)
De nouveaux eleves et devoirs peuvent être ajoutés en utilisant les boutons correspondants.
Chaque ligne(=eleve) ou colonne(=devoir) peut être supprimés en appuyant sur le boutton correspondant.
Une confirmation indiquant le nom de l'eleve ou du devoir s'affiche pour valider la suppression.

- Deux modes de notations sont possibles : mode couleur ou mode note.
Chaque devoir a son propre mode de notation. Il est possible de passer d'un devoir à un autre 
même si les devoirs ont des modes de notation différent (les modes de chaque devoirs sont stockés individuellement).
Un message d'erreur s'affiche si on essaye de changer le mode alors que le devoir 
en cours de notation a déjà des notes afin d'empecher la perte des notes dejà mise.
Il faut donc pour changer le mode de notation que la colonne (=devoir) soit vide de toutes données (couleurs ou notes)
c'est à dire le faire dès la première note ou d'abord réinitialiser les notes avec le boutton reset correspondant.

-le mode couleur permet de choisir 4 couleurs différentes :
    1 : rouge
    2 : orange
    3 : jaune
    4 : vert
Le mode note permet de noter avec un chiffre allant de 1 à 5.
Les inputs peuvent être effectués par le pad numérique ou par les touches "classiques" (pour utilisateur de mac par ex)
Si un input est en dehors des chiffres attendus un message d'erreur s'affiche, l'input en cours est réinitialisé.

- pour les deux modes, le focus passe automatiquement sur le prochain champ du devoir SAUF si le prochain champ a dejà une note/couleur (afin d'éviter "d'écraser" les notes/couleurs déjà mises)
Il est possible de noter les devoirs dans le désordre (par ex noter le devoir 3 après le 1) en cliquant le 1er champ de la colonne correspondante.
Dans ce cas il sera necessaire de cliquer sur le premier champ du/des devoir qui a/ont été skippé pour le noter (le devoir 2 dans l'exemple du dessus).
Il est également possible de noter les éleves dans le désordre, il suffit de cliquer sur le champ correspondant.

- Le boutton de reset général remet à zéro tous les champs, réinitialise les noms de tous les devoirs/eleves et force la sélection 
d'un mode en cachant tous les inputs (idem qu'au premier démarrage de l'appli).
Un message de confirmation s'affiche pour valider le reset des notes (confirm : reset, cancel : annulation)

- Les bouttons de reset par devoir remettent à zéro la colonne correspondante ainsi que le nom du devoir.
un message de confirmation indiquant le nom du devoir s'affiche pour valider ou non le reset des notes.
les inputs de la colonne correspondante seront cachés tant qu'un mode n'a pas été choisi afin de forcer la selection d'un mode.

*********** Améliorations pour une V2 ****************************************
-système de localstorage : par devoir, par eleve, général.
-système d'affichage des devoirs/eleves enregistrés en localstorage
-un peu de css...