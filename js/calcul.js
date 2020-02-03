
function formater(valeurNonFormatee){
	var valeurFormatee;
	valeurFormatee=valeurNonFormatee.replace(",",".");
	valeurFormatee=valeurFormatee.replace(/[^\d.]/g, "");
	valeurFormatee=parseInt(valeurNonFormatee);

	return valeurFormatee;


	/*
	cette fonction permet de généraliser  sinon il cela aurait donné
	ceci :

	var montantHT=document.getElementById("montantHT").value;
	montantHT=montantHT.replace(",",".");
	montantHT=montantHT.replace(/[^\d.]/g, "");
	montantHT=parseInt(montantHT);

	var montantTVA=document.getElementById("montantTVA").value;
	montantTVA=montantTVA.replace(",",".");
	montantTVA=montantTVA.replace(/[^\d.]/g, "");
	montantTVA=parseInt(montantTVA);

	var montantTTC=document.getElementById("montantTTC").value;
	montantTTC=montantTTC.replace(",",".");
	montantTTC=montantTTC.replace(/[^\d.]/g, "");
	montantTTC=parseInt(montantTTC);

	var montantTTC=document.getElementById("montantTTC").value;
	tauxTV=tauxTVA.replace(",",".");
	tauxTVA=tauxTVA.replace(/[^\d.]/g, "");
	tauxTVA=parseInt(tauxTVA);*/
}

/*fonction permettant de calculer un montant TVA 
doit en partant d'un montant HT
soit en partant d'un montant de TVA
soi en parant d'un montant TTV 
(le nom du paramètre est arbitraire et 
vous permet simplement aau niveau fonctionnel de savoir quelle donnée vous attendes en entrée)*/


function calculTva(depart){

	if(depart=="tauxTVA"){
		depart="montantHT";
		/* on peut l'écrire aussi comme ceci :
		if(depart=="tauxTVA")depart="montantHT";
		quand un if n'a que une inscription il peut être écrit de façon
		plus simple 
		le if fait le lien entre le taux de tva et le montant ht. 
		si l'utilisateur commence par entrer un taux de tva, 
		le calcul partira du montant ht car le taux de tva seul ne permet
		pas de lancer le calcul*/

	}

	var montantHT= formater(document.getElementById("montantHT").value);
	var montantTVA=formater(document.getElementById("montantTVA").value);
	var montantTTC=formater(document.getElementById("montantTTC").value);
	var montantTTC=formater(document.getElementById("montantTTC").value);


/*la fonction générique formater créé; elle reçoit la valeur de départ 
et fait les différent formatages pour les futurs calculs*/
	if(isNaN(montantHT)||montantHT==""){
		montantHT=0;
	}
	console.log

	if(isNaN(tauxTVA)||tauxTVA==""){
		document.getElementById("totalTva").innerHTML("<div class=\"erreur\">Vous devez saisir une TVA valide!</div> <br>")
	}
	if (depart=="montantHT") {
		montantTVA= Math.round(montantHT*tauxTVA/100);
		montantTTC= Math.round(Number(montantHT)+ Number(montantTVA));
		document.getElementById("montantHT").value=montantHT;

	} else if (depart=="montantTVA") {
		montantHT= Math.round(montantTVA/(tauxTVA/100));
		montantTTC=Math.round(Number(montantHT)+number(montantTVA));
		document.getElementById("montantTVA").value=montantTVA;

}else if (depart=="montantTTC") {
	montantHT=Math.round(montantTTC*(100/(100+tauxTVA)));
	montantTVA= Math.round(montantTTC-montantHT);
	document.getElementById("montantTTC").value=montantTTC;

}
	// Afficher un msg avec le résumé des valeurs

	if(montantHT != 0){
		document.getElementById("totalTva").innerHTML() = "<p style=\"font-size:15px;\">Montant Hors taxes : <strong>" + montantHT + "€</strong>"
			+ "Montant TVA : <strong>" + montantTVA + "€</strong>"
			+ "Montant TTC : <strong>" + montantTTC + "€</strong>"
			+ "</p>";
	}
}



/* cette fonction permet de donner un style css particulier 
lorsqu'une case est cliquée pour une saisie*/
function initInput(depart){
var inputDepart = document.getElementById(depart);
inputDepart.className="input-calcul saisie-active";
inputDepart.select();
inputDepart.focus();
inputDepart.setSelectionRange(0,9999);
}

/*cette fonction permet de rétablir une style css à l'input
qui aura été quitté(perte de focus) et d'ajouter le symbole "€"*/
function reInitInput(depart){
	var inputDepart = document.getElementById(depart);
	var inputDepartValue = inputDepart.value;
	inputDepartValue = inputDepartValue.trim();
	/* .trim retire les blancs en début et fin de chaine*/

	/*si je n'ai pas de valeur dans mon input, j'en mets une par défaut*/
	if(inputDepartValue.length ==0){
		inputDepart.value=0+"€";
		/* si je n'ai pas le symole € alors je ne remets*/

	}else if (inputDepartValue.indexOf("€")===-1){
		inputDepart.value= inputDepart.value+"€";
	}

	/*je remets la class CSS de départ*/
	inputDepartValue.className="input-calcul";
}

/* cette fonction permet de mettre à jour le taux et d'ajouter le symbole"%"*/
function miseAJourTaux(taux){
 document.getElementById("tauxTVA").value = taux + "%";
	calculTva("tauxTVA");
}