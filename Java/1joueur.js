// Annoncer au navigateur que je vais travailler sur un canvas avec un contexte en 2D
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Ajouter des 'events listeners' pour détecter quand l'utilisateur appuie sur une touche du clavier
var upBluePressed = false;
var downBluePressed = false;

// Ajouter des 'events listeners' pour détecter quand l'ordinateur appuie sur une touche du clavier
var upRedPressed = false;
var downRedPressed = false;

// Déterminer le score de l'utilisateur/ordinateur
var scorePlayer = 0;
var scoreComputer = 0;

// Déterminer le niveau de l'ordinateur
var computerLevel = 0.075;

// Déterminer la position de départ de la boule 1
var x1 = canvas.width-60;
var y1 = canvas.height/2;

// Déterminer la position de départ de la boule 2
var x2 = 50;
var y2 = canvas.height/2;

// Déterminer le rayon des boules
var ballRadius = 10;

// Déterminer la couleur de la balle 1
var ball1Color = "blue";

// Déterminer la couleur de la balle 2
var ball2Color = "red";

// Déterminer le statut des balles
var ball1Status = "there";
var ball2Status = "there";

// Déterminer la vitesse/direction de la boule 1
var dx1 = -3;
var dy1 = -0.5;

// Déterminer la vitesse/direction de la boule 2
var dx2 = 3;
var dy2 = 0.5+getRandomInt(3);

// Déterminer la taille du paddle de l'utilisateur
var bluePaddleHeight = 150;
var bluePaddleWidth = 15;

// Déterminer la taille du paddle de l'ordinateur
var redPaddleHeight = 150;
var redPaddleWidth = 15;

// Déterminer la position la plus en haut du paddle de l'utilisateur
var bluePaddleY = (canvas.height-bluePaddleHeight) / 2;

// Déterminer la position la plus en haut du paddle de l'ordinateur
var redPaddleY = (canvas.height-redPaddleHeight) / 2;

// Déterminer le nombre de rangées et de colonnes de briques
var brickRowCount = 12;
var brickColumnCount = 6;

// Déterminer la hauteur et largeur des briques
var brickWidth = 30;
var brickHeight = 50;

// déterminer la distance qui sépart chaque brique
var brickPadding = 5;

// Déterminer le point supérieur gauche de chaque brique
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// Déterminer le nombre de briques restantes
var nbBriquesRestantes = brickColumnCount*brickRowCount;

// Initialiser le tableau de briques
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}

// Créer une fonction pour trouver des nombres au hasard [0;max[
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Créer une fonction qui va renvoyer vrai à l'events listeners lorsque l'utilisateur appuie sur la flèche du haut/bas
function keyDownHandlerBlue(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upBluePressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downBluePressed = true;
    }
}

// Créer une fonction qui va renvoyer faux à l'events listeners lorsque l'utilisateur relache la flèche du haut/bas
function keyUpHandlerBlue(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upBluePressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downBluePressed = false;
    }
}

// Créer une fonction qui détecte quand une brique est touchée par une balle
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x1 > b.x && x1 < b.x+brickWidth && y1 > b.y && y1 < b.y+brickHeight) {
                    dx1 = -dx1;
                    b.status = 0;
                    nbBriquesRestantes--;
                    if (ball1Color=="red"){
                    	scoreComputer += 1;
                    }
                    else{
                    	scorePlayer += 1;
                    }
                }
                if(x2 > b.x && x2 < b.x+brickWidth && y2 > b.y && y2 < b.y+brickHeight) {
                    dx2 = -dx2;
                    b.status = 0;
                    nbBriquesRestantes--;
                    if (ball2Color=="red"){
                    	scoreComputer += 1;
                    }
                    else{
                    	scorePlayer += 1;
                    }
                }
            }
        }
    }
}

// Créer une fonction qui affiche le score de l'ordinateur
function drawScoreComputer() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Ordi : "+scoreComputer, 50, 40);
}

// Créer une fonction qui affiche le score de l'utilisateur
function drawScorePlayer() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText(scorePlayer+" : Joueur", canvas.width-150, 40);
}

// Créer une fonction qui dessine la boule 1
function drawBall1() {
    ctx.beginPath();
    ctx.arc(x1, y1, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ball1Color;
    ctx.fill();
    ctx.closePath();
}

// Créer une fonction qui dessine la boule 2
function drawBall2() {
    ctx.beginPath();
    ctx.arc(x2, y2, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ball2Color;
    ctx.fill();
    ctx.closePath();
}

// Créer une fonction qui dessine le paddle du joueur
function drawBluePaddle() {
    ctx.beginPath();
    ctx.rect(canvas.width-bluePaddleWidth, bluePaddleY, bluePaddleWidth, bluePaddleHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

// Créer une fonction qui dessine le paddle de l'ordinateur
function drawRedPaddle() {
    ctx.beginPath();
    ctx.rect(0, redPaddleY, redPaddleWidth, redPaddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

// Créer une fonction qui dessine toutes le briques
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft+400;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Créer une fonction qui dessine une image à la fois
function draw() {
	// Effacer l'écran pour ne pas laisser la trace de l'image précédente
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Appliquer la fonction qui dessine les briques
    drawBricks();

    // Appliquer la fonction qui détecte les collisions des balles avec les briques
    collisionDetection();

    // Appliquer les fonctions qui affichent les scores
	drawScoreComputer();
	drawScorePlayer();

    // Déterminer si la partie est terminée (plus de briques ou plus de balles)
    if ((nbBriquesRestantes == 0)||(ball1Status == "gone" && ball2Status == "gone")) {
    	// Afficher un message pour dire que la partie est terminée
        alert("LA PARTIE EST TERMINÉE!");
        // Vérifier qui est le vainqueur de la partie
        if (scorePlayer>scoreComputer){
        	// Afficher un message pour annoncer que le joueur a gagné
        	alert("TU AS GAGNÉ !");
        }
        else if (scoreComputer>scorePlayer){
        	// Afficher un message pour annoncer que l'ordinateur a gagné et le joueur a perdu
        	alert("TU AS PERDU !");
        }
        else{
        	// Afficher un message pour annoncer que c'est égalité
        	alert("C'EST ÉGALITÉ ! REFAIS UNE PARTIE POUR VOUS DÉPARTAGEZ !");
        }
        // Retourner au menu
        window.history.back();
        // Arrêter la boucle à intervalles
        clearInterval(interval);
    }

    // S'occuper de la boule 1 uniquement si son statut indique qu'elle est encore sur l'écran
    if (ball1Status == "there"){
    	// Appliquer la fonction qui dessine la boule 1
    	drawBall1();

    	// Si la balle 1 touche le paddle bleu elle change de direction instantanément et elle devient bleue
	    if (y1 + dy1 > bluePaddleY - ballRadius && y1 + dy1 < bluePaddleY + bluePaddleHeight + ballRadius && x1 > canvas.width - bluePaddleWidth - ballRadius){
	    	dx1 = -dx1;
	    	// Vérifier avec quel angle la balle va rebondir pour que l'utilisateur puisse agir au maximum
	    	// sur le déroulement de la partie (plus la balle atterit au centre du paddle, plus elle repart)
	    	// sur l'axe x
	   		if ((y1 < bluePaddleY + (bluePaddleHeight/10)*1)||(y1 > bluePaddleY + bluePaddleHeight - (bluePaddleHeight/10)*1)){
	   			if (dy1 < 0){
	   				dy1 = -4;
	   			}
	   			else {
	   				dy1 = 4;
	   			}
	   		}
	   		else if ((y1 < bluePaddleY + (bluePaddleHeight/10)*2)||(y1 > bluePaddleY + bluePaddleHeight - (bluePaddleHeight/10)*2)){
	   			if (dy1 < 0){
	   				dy1 = -3;
	   			}
	   			else {
	   				dy1 = 3;
	   			}
	   		}
	   		else if ((y1 < bluePaddleY + (bluePaddleHeight/10)*3)||(y1 > bluePaddleY + bluePaddleHeight - (bluePaddleHeight/10)*3)){
	   			if (dy1 < 0){
	   				dy1 = -2;
	   			}
	   			else {
	   				dy1 = 2;
	   			}
	   		}
	   		else if ((y1 < bluePaddleY + (bluePaddleHeight/10)*4)||(y1 > bluePaddleY + bluePaddleHeight - (bluePaddleHeight/10)*4)){
	   			if (dy1 < 0){
	   				dy1 = -1;
	   			}
	   			else {
	   				dy1 = 1;
	   			}
	   		}
	   		else if ((y1 < bluePaddleY + (bluePaddleHeight/10)*5)||(y1 > bluePaddleY + bluePaddleHeight - (bluePaddleHeight/10)*5)){
	   			if (dy1 < 0){
	   				dy1 = -0.5;
	   			}
	   			else if (dy1 > 0){
	   				dy1 = 0.5;
	   			}
	   			else{
	   				dy1 = 0;
	   			}
	   		}
	    	ball1Color = "blue";
	    }

	    // Si la balle 1 touche le paddle rouge elle change de direction instantanément et elle devient rouge
	    if (y1 + dy1 > redPaddleY - ballRadius && y1 + dy1 < redPaddleY + redPaddleHeight + ballRadius && x1 < redPaddleWidth + ballRadius){
	    	dx1 = -dx1;
	    	// Vérifier avec quel angle la balle va rebondir pour que l'utilisateur puisse agir au maximum
	    	// sur le déroulement de la partie (plus la balle atterit au centre du paddle, plus elle repart)
	    	// sur l'axe x
	   		if ((y1 < redPaddleY + (redPaddleHeight/10)*1)||(y1 > redPaddleY + redPaddleHeight - (redPaddleHeight/10)*1)){
	   			if (dy1 < 0){
	   				dy1 = -6;
	   			}
	   			else {
	   				dy1 = 6;
	   			}
	   		}
	   		else if ((y1 < redPaddleY + (redPaddleHeight/10)*2)||(y1 > redPaddleY + redPaddleHeight - (redPaddleHeight/10)*2)){
	   			if (dy1 < 0){
	   				dy1 = -5;
	   			}
	   			else {
	   				dy1 = 5;
	   			}
	   		}
	   		else if ((y1 < redPaddleY + (redPaddleHeight/10)*3)||(y1 > redPaddleY + redPaddleHeight - (redPaddleHeight/10)*3)){
	   			if (dy1 < 0){
	   				dy1 = -4;
	   			}
	   			else {
	   				dy1 = 4;
	   			}
	   		}
	   		else if ((y1 < redPaddleY + (redPaddleHeight/10)*4)||(y1 > redPaddleY + redPaddleHeight - (redPaddleHeight/10)*4)){
	   			if (dy1 < 0){
	   				dy1 = -3;
	   			}
	   			else {
	   				dy1 = 3;
	   			}
	   		}
	   		else if ((y1 < redPaddleY + (redPaddleHeight/10)*5)||(y1 > redPaddleY + redPaddleHeight - (redPaddleHeight/10)*5)){
	   			if (dy1 < 0){
	   				dy1 = -2;
	   			}
	   			else if (dy1 > 0){
	   				dy1 = 2;
	   			}
	   			else{
	   				dy1 = 1;
	   			}
	   		}
	    	ball1Color = "red";
	    }

	    // Si la balle 1 touche le mur droit ou gauche, elle disparait
	    if (x1 + dx1 > canvas.width-ballRadius || x1 + dx1 < ballRadius){
	    	// Modifier le statut de la balle pour indiquer qu'elle n'est plus sur l'écran
	    	ball1Status = "gone";
	   		alert('La balle 1 est partie à jamais...');

	   		// Si la balle est rouge
	    	if (ball1Color=="red"){
	    		// Si la balle est dans le camp rouge
	    		if (x1 + dx1 < ballRadius){
	    			// rouge a -15
	    			scoreComputer -= 15;
	    		}
	    		// Si la balle est dans le camp bleu
	    		if (x1 + dx1 > canvas.width-ballRadius){
	    			// rouge a +25
	    			scoreComputer += 25;
	    		}
	    	}
	    	// Si la balle est bleue
	    	else{
	    		// Si la balle est dans le camp rouge
	    		if (x1 + dx1 < ballRadius){
	    			// bleu a +25
	    			scorePlayer += 25;
	    		}
	    		// Si la balle est dans le camp bleu
	    		if (x1 + dx1 > canvas.width-ballRadius){
	    			// bleu a -5
	    			scorePlayer -= 5;
	    		}
	    	}
	    }
	    
	    // Si la balle 1 touche le mur du bas ou celui du haut, elle change de direction instantanément
	    if(y1 + dy1 > canvas.height-ballRadius || y1 + dy1 < ballRadius) {
	        dy1 = -dy1;
	    }
    }

    // S'occuper de la boule 2 uniquement si son statut indique qu'elle est encore sur l'écran
    if (ball2Status =="there"){
    	// Appliquer la fonction qui dessine la boule 2
    	drawBall2();

    	// Si la balle 2 touche le paddle bleu elle change de direction instantanément et elle devient bleue
	    if (y2 + dy2 > bluePaddleY - ballRadius && y2 + dy2 < bluePaddleY + bluePaddleHeight + ballRadius && x2 > canvas.width - bluePaddleWidth - ballRadius){
	    	dx2 = -dx2;
	    	// Vérifier avec quel angle la balle va rebondir pour que l'utilisateur puisse agir au maximum
	    	// sur le déroulement de la partie (plus la balle atterit au centre du paddle, plus elle repart)
	    	// sur l'axe x
	   		if ((y2 < bluePaddleY + (bluePaddleHeight/10)*1)||(y2 > bluePaddleY + bluePaddleHeight - (bluePaddleHeight/10)*1)){
	   			if (dy2 < 0){
	   				dy2 = -4;
	   			}
	   			else {
	   				dy2 = 4;
	   			}
	   		}
	   		else if ((y2 < bluePaddleY + (bluePaddleHeight/10)*2)||(y2 > bluePaddleY + bluePaddleHeight - (bluePaddleHeight/10)*2)){
	   			if (dy2 < 0){
	   				dy2 = -3;
	   			}
	   			else {
	   				dy2 = 3;
	   			}
	   		}
	   		else if ((y2 < bluePaddleY + (bluePaddleHeight/10)*3)||(y2 > bluePaddleY + bluePaddleHeight - (bluePaddleHeight/10)*3)){
	   			if (dy2 < 0){
	   				dy2 = -2;
	   			}
	   			else {
	   				dy2 = 2;
	   			}
	   		}
	   		else if ((y2 < bluePaddleY + (bluePaddleHeight/10)*4)||(y2 > bluePaddleY + bluePaddleHeight - (bluePaddleHeight/10)*4)){
	   			if (dy2 < 0){
	   				dy2 = -1;
	   			}
	   			else {
	   				dy2 = 1;
	   			}
	   		}
	   		else if ((y2 < bluePaddleY + (bluePaddleHeight/10)*5)||(y2 > bluePaddleY + bluePaddleHeight - (bluePaddleHeight/10)*5)){
	   			if (dy2 < 0){
	   				dy2 = -0.5;
	   			}
	   			else if (dy2 > 0){
	   				dy2 = 0.5;
	   			}
	   			else{
	   				dy2 = 0;
	   			}
	   		}
	    	ball2Color = "blue";
	    }

	    // Si la balle 2 touche le paddle rouge elle change de direction instantanément et elle devient rouge
	    if (y2 + dy2 > redPaddleY - ballRadius && y2 + dy2 < redPaddleY + redPaddleHeight + ballRadius && x2 < redPaddleWidth + ballRadius){
	    	dx2 = -dx2;
	    	// Vérifier avec quel angle la balle va rebondir pour que l'utilisateur puisse agir au maximum
	    	// sur le déroulement de la partie (plus la balle atterit au centre du paddle, plus elle repart)
	    	// sur l'axe x
	   		if ((y2 < redPaddleY + redPaddleHeight/10)||(y2 > redPaddleY + redPaddleHeight - redPaddleHeight/10)){
	   			if (dy2 < 0){
	   				dy2 = -6;
	   			}
	   			else {
	   				dy2 = 6;
	   			}
	   		}
	   		else if ((y2 < redPaddleY + redPaddleHeight/5)||(y2 > redPaddleY +  redPaddleHeight - redPaddleHeight/5)){
	   			if (dy2 < 0){
	   				dy2 = -5;
	   			}
	   			else {
	   				dy2 = 5;
	   			}
	   		}
	   		else if ((y2 < redPaddleY + redPaddleHeight/3.33)||(y2 > redPaddleY +  redPaddleHeight - redPaddleHeight/3.33)){
	   			if (dy2 < 0){
	   				dy2 = -4;
	   			}
	   			else {
	   				dy2 = 4;
	   			}
	   		}
	   		else if ((y2 < redPaddleY + redPaddleHeight/2.5)||(y2 > redPaddleY +  redPaddleHeight - redPaddleHeight/2.5)){
	   			if (dy2 < 0){
	   				dy2 = -3;
	   			}
	   			else {
	   				dy2 = 3;
	   			}
	   		}
	   		else if ((y2 < redPaddleY + redPaddleHeight/2)||(y2 > redPaddleY +  redPaddleHeight - redPaddleHeight/2)){
	   			if (dy2 < 0){
	   				dy2 = -2;
	   			}
	   			else if (dy1 > 0){
	   				dy2 = 2;
	   			}
	   			else{
	   				dy2 = 1;
	   			}
	   		}
	    	ball2Color = "red";
	    }

	    // Si la balle 2 touche le mur droit ou gauche, elle disparait
	    if (x2 + dx2 > canvas.width-ballRadius || x2 + dx2 < ballRadius){
	    	// Modifier le statut de la balle pour indiquer qu'elle n'est plus sur l'écran
	    	ball2Status = "gone";
	    	alert('La balle 2 est partie à jamais...');

	    	// Si la balle est rouge
	    	if (ball2Color=="red"){
	    		// Si la balle est dans le camp rouge
	    		if (x2 + dx2 < ballRadius){
	    			// rouge a -15
	    			scoreComputer -= 15;
	    		}
	    		// Si la balle est dans le camp bleu
	    		if (x2 + dx2 > canvas.width-ballRadius){
	    			// rouge a +25
	    			scoreComputer += 25;
	    		}
	    	}
	    	// Si la balle est bleue
	    	else if (ball2Color=="blue"){
	    		// Si la balle est dans le camp rouge
	    		if (x2 + dx2 < ballRadius){
	    			// bleu a +25
	    			scorePlayer += 25;
	    		}
	    		// Si la balle est dans le camp bleu
	    		if (x2 + dx2 > canvas.width-ballRadius){
	    			// bleu a -5
	    			scorePlayer -= 5;
	    		}
	    	}
	    }
	    
	    // Si la balle 2 touche le mur du bas ou celui du haut, elle change de direction instantanément
	    if(y2 + dy2 > canvas.height-ballRadius || y2 + dy2 < ballRadius) {
	        dy2 = -dy2;
	    }
    }

    // Appliquer la fonction qui dessine le paddle de l'utilisateur
    drawBluePaddle();

    // Appliquer la fonction qui dessine le paddle de l'ordinateur
    drawRedPaddle();

	// Si la touche du bas est enfoncée, ajouter 9 aux coordonnées Y du paddle bleu
	if(downBluePressed) {
		bluePaddleY += 9;
		// Vérifier que le paddle bleu ne sort pas du canvas
		if (bluePaddleY + bluePaddleHeight > canvas.height){
		    bluePaddleY = canvas.height - bluePaddleHeight;
		}
	}
    // Si la touche du haut est enfoncée, retirer 9 aux coordonnées Y du paddle bleu
    else if(upBluePressed) {
		bluePaddleY -= 9;
		// Vérifier que le paddle bleu ne sort pas du canvas
		if (bluePaddleY < 0){
		    bluePaddleY = 0;
		}
	}

	// Créer l'intelligence de l'ordinateur
	// Vérifier que le paddle rouge ne sort pas du canvas
	if (redPaddleY + redPaddleHeight > canvas.height){
		redPaddleY = canvas.height - redPaddleHeight;
	}
	else if (redPaddleY < 0){
		redPaddleY = 0;
	}
	else {
		// Comportement du paddle
		// Éviter que l'ordinateur ne fasse des mouvements trop brusques et alors imbattables
		if (((x1<x2)&&(ball1Status=="there"))||(ball2Status=="gone")){
			if ((y1<=redPaddleY-14)||(y1>=redPaddleY+14)){
				redPaddleY += (y1 - (redPaddleY + redPaddleHeight/2)) * computerLevel;
			}
		}
		else if (((x2<x1)&&(ball2Status=="there"))||(ball1Status=="gone")){
			if ((y2<=redPaddleY-14)||(y2>=redPaddleY+14)){
				redPaddleY += (y2 - (redPaddleY + redPaddleHeight/2)) * computerLevel;
			}
		}
	}

    // Ajouter la vitesse/direction aux coordonnées de la boule 1 pour la déplacer
    x1 += dx1;
    y1 += dy1;

    // Ajouter la vitesse/direction aux coordonnées de la boule 2 pour la déplacer
    x2 += dx2;
    y2 += dy2;
}

// Répéter la fonction qui dessine une image à la fois tout les 10 millièmes de secondes pour
// donner l'impression que la balle se déplace
var interval = setInterval(draw, 9);

// Appliquer les deux fonctions qui vont renvoyer vrai aux 'events listeners' lorsque l'utilisateur appuie sur la flèche du haut/bas
document.addEventListener("keydown", keyDownHandlerBlue, false);
document.addEventListener("keyup", keyUpHandlerBlue, false);