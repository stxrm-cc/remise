

// Game start in JS

// Defines clone variable/function to deepclone arrays
const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);
var checkAI = document.getElementById("#checkAI");


/* Script that creates the grid by cloning the chocolate image for x:length
  and y:height */

// defines variables q,d,form using jquery
const d = document;
const q = (e, n = d) => n.querySelector(e);

// Listens for activity on the button depending on its state
function setGrid_i() {

  globalThis.hValue = parseInt(document.getElementById('heightInput').value);
  globalThis.lValue = parseInt(document.getElementById('lengthInput').value);
  console.log(lValue, hValue);

  let choc = q("#choc");
  choc.innerHTML = "";

// Maxes out the values for height and length to 10 for practical reasons
  if (hValue > 10) hValue = 10;
  if (lValue > 10) lValue = 10;

  // assigns chocolate image to length and height
      for (var y = 0; y < hValue; y++) {
        globalThis.div = d.createElement("div");
        choc.appendChild(div);

        for (var x = 0; x < lValue; x++) {
          globalThis.child = q("#imgPos", q("template").content).cloneNode(true);
          child.setAttribute("id","imgPos" + (lValue - x) + "_" + (hValue - y));
          div.appendChild(child);
        }
      }
};



// Function that checks for all the possible positions in the array
function EvalPos(gridTest){
  let newPosition = [];
  for(let i = 0; i < gridTest.length; i++){
    evalX = gridTest[i];
    //console.log("Evalx", evalX);
    for(let j = 0; j < evalX.length; j++){
      //console.log("Grid", gridTest, j+1, i+1);
      if (evalX[j] != 0){
        //console.log("Grid where evalx[j] isnt 0", evalX[j] gridTest, j+1, i+1);
        newPosition = newPosition.concat(Array(Remplace(clone(gridTest), j+1, i+1)));
      }
    }
  }
  return newPosition;
};

// function to block the grid value setters when game starts
function startGame(){
  if(document.getElementById("startButton").getAttribute("value") == "Start"){
    document.getElementById("startButton").setAttribute("value", "Cancel");
    document.getElementById("buttonChange").removeAttribute("onclick");
    $("input").attr("readonly", true);
    document.getElementById("rectangleText").classList.remove("visible");
    document.getElementById("rectangle").classList.remove("visible");
    document.getElementById("grid_etc").classList.remove('visible');
} else if (document.getElementById("startButton").getAttribute("value") == "Cancel"){
    document.getElementById("startButton").setAttribute("value", "Start");
    document.getElementById("buttonChange").setAttribute("onclick", "setGrid_i()");
    $("input").attr("readonly", false);
    document.getElementById("rectangleText").classList.add("visible");
    document.getElementById("rectangle").classList.add("visible");
    document.getElementById("grid_etc").classList.add('visible');
    }
};

// commentaire anglais = Dimitris
// commentaire francais = Nils


// Defines global values that constantly update on the click of the form button for the form inputs
function formVals(){
  globalThis.hValue = parseInt(document.getElementById('heightInput').value);
  globalThis.lValue = parseInt(document.getElementById('lengthInput').value);
};


// checks if chocolate piece is visible or not depending on the element ID it is given
function checkVis(id){
  // preconditions [-----
  if ((typeof id === 'string') && (id.length === 5)){
    var first = 10;
    var last = 10;
    }
  else if ((typeof id === 'string') && (id.length === 4) && (id[1] == "0")){
    var first = 10;
    var last = id[3];
  }
  else if ((typeof id === 'string') && (id.length === 4) && (id[3] == "0")){
    var first = id[0]
    var last = 10;
  }
  else if ((typeof id === 'string') && (id.length === 3)){
    var first = id[0];
    var last = id[2];
  }
  else if ((typeof id === 'number') && (id.toString().length === 4)){
      var first = 10;
      var last = 10;
    }
  else if ((typeof id === 'number') && (id.toString().length === 3) && (String(id)[1] == "0")){
    var first = 10;
    var last = String(id)[2];
  }
  else if ((typeof id === 'number') && (id.toString().length === 3) && (String(id)[2] == "0")){
    var first = String(id)[0];
    var last = 10;
  }
  else if ((typeof id === 'number') && (id.toString().length === 2)){
    var first = String(id)[0];
    var last = String(id)[1];
  }
  // ----] end of preconditions

  let idString = "imgPos" + first + "_" + last;
  var chocci = d.getElementById(idString);
  if (chocci.classList.contains('visible')){
    return true;
  } else {
    return false;
  }
};

function Remplace(gridTest,x,y){
  // remplace en bas et a droite de la position x;y dans l'arrey 'gridTest'
  gridTest = reverseArray(gridTest);
  let save = gridTest[y-1];
  for (let t = 0; t < save.length; t++) {
    if (t+1 >= x){
      save[t] = 0;
    }
  }
  gridTest[y-1] = save;
  for (let t = 0; t < y; t++){
    let save = gridTest[t];
    save[x-1] = 0;
    gridTest[t] = save;
  }
  return gridTest;
};

// creates an array for the chocolate pieces and assigns them a value(1 if visible 0 if not)
function checkAll(){
  globalThis.grid = new Array(hValue).fill(0).map(() => new Array(lValue).fill(0));
  for (let i = 0; i < hValue; i++){
    for (let j = 0; j < lValue; j++){
      let imageCheck = String(j+1) + '_' + String(i+1);
      if (checkVis(imageCheck) == true){
        grid[i][j] = 1;
      } else if (checkVis(imageCheck) == false){
        grid[i][j] = 0;
      }
    }
  }
  grid = reverseArray(grid); // makes the array upside down
  return grid;
};

// function that removes the image visibility if its value in the array is 0
function removeChoc(gridRemove){
  var notVis = 0;
  for (let i = 0; i < hValue; i++){
    for (let j = 0; j < lValue; j++){
      let imageCheck = "imgPos" + String(j+1)+ '_' +String(i+1);
      let imgElem = document.getElementById(imageCheck);
      if (gridRemove[i][j] == notVis){
        imgElem.classList.remove("visible");
      }
    }
  }
};

function reverseArray (arr){
  // useless function xD
  return arr
};

function VisOrNot(e){
  // retourne si un chocolat (e) est manger ou non
  if (e.classList.contains('visible')){
    var choc_VisOrNot = true;
  } else {
    var choc_VisOrNot = false;
  }

  return choc_VisOrNot;
};


function doGame(e){
  // whene you eat a Chocolate
  if(document.getElementById("startButton").getAttribute("value") == "Cancel"){
    checkAll();
    if (VisOrNot(e) == false){
      alert("Cage occupee!");
      return;
    }
    var choc_piece = e.getAttribute("id");
    choc_piece = choc_piece.replace('imgPos', '');
    if (choc_piece.length === 5){
        var x1 = 10;
        var y1 = 10;
      }
    else if ((choc_piece.length === 4) && (choc_piece[1] == "0")){
      var x1 = 10;
      var y1 = choc_piece[3];
    }
    else if ((choc_piece.length  === 4) && (choc_piece[3] == "0")){
      var x1 = choc_piece[0];
      var y1 = 10;
    }
    else if (choc_piece.length  === 3){
      var x1 = choc_piece[0];
      var y1 = choc_piece[2];
    }
    let newGrid = Remplace(checkAll(), x1, y1);
    removeChoc(newGrid);
    if (NombrePosition(newGrid) != 0){
      IA_play(50)
    }
 }
};


function IA_play(difficulty){
  // permet de choisir la difficulter (0-100)
  // met 1s a jouer au minimum (pour pas que ce soit trop rapide)
  if (difficulty < 50){
    if (getRandomInt(51) <= difficulty){
      setTimeout(() => {  removeChoc(IA_MiniMax(checkAll())); }, 1000);
    }else{
      setTimeout(() => {  removeChoc(AI_aleatoire(checkAll())); }, 1000);
    }
  }else{
    if (getRandomInt(51) <= (difficulty - 50)) {
      setTimeout(() => {  removeChoc(AI_aleatoire(checkAll())); }, 1000);
    }else{
      setTimeout(() => {  removeChoc(IA_MiniMax(checkAll())); }, 1000);
    }
  }
};




function NombrePosition(position){
  // retourne le nombre de position jouable dans l'array en argument
  let nb = 0;
  for (let i = 0; i < position.length; i++){
    for (let j = 0; j < position[i].length; j++){
      if (position[i][j] == 1){
        nb += 1;
      }
    }
  }
  return nb;
}


function getRandomInt(max) {
  // retourne un nombre aleatoire dans [0;max[
  return Math.floor(Math.random() * max);
}



// ============================== IA developpement ========================== //


/////////////////////////////////// Random IA //////////////////////////////////

function AI_aleatoire(gridTest){
  // fait jouer une IA aleatoire
  let position = EvalPos(gridTest);
  return position[getRandomInt(position.length)];
};


////////////////////////////////// Minimax AI //////////////////////////////////

function ScoreMinimax(position,player,depth){
  // fait une evaluation de la position 'position'

  // si il ne reste plus que 1 position a jouer apres le toure de l'IA
  // c'est gagne mais si il en reste 0 c'est a eviter
  let nombre = NombrePosition(position);
  let score = 0;
  if (nombre < 2){
    if (nombre == 1){
      if (player){
        score += -10 - depth;
      }else{
        score += 10 + depth;
      }
    }
    else{ // if nombre == 0
      if (player){
        score += 10 + depth;
      }else{
        score += -10 - depth;
      }
    }
  }else{ // if nombre >= 2
    if (nombre%2 == 0){
      if (player){
        score += 1;
      }else{
        score -= 1;
      }
    }else{ // if nombre%2 == 0
      if (player){
        score -= 1;
      }else{
        score += 1;
      }
    }
  }
  return score;
};


function MiniMax(position,depth,alpha,beta,maximazingPlayer){
  positionCalcul += 1
  // fabrique l'arbre des possibles
  if (depth == 0 || NombrePosition(position) < 2){
    // evalus si on arrive a la fin de la partie ou si depth est egale a 0
    // c'est ici que les evaluations sont faites
    return ScoreMinimax(position,maximazingPlayer,depth);
  }
  let suivant = EvalPos(position);
  if (maximazingPlayer){
    // cela evalu toutes les possibilites de jouer apres pour l'IA
    let maxEval = -Infinity;
    for (let i = 0; i < suivant.length; i++){
      let evaluation = MiniMax(suivant[i], depth - 1, alpha, beta, false);
      maxEval = Math.max(maxEval,evaluation);
      alpha = Math.max(alpha,evaluation);
      if (beta <= alpha){
        // permet d'elaguer l'arbre des possibles (un peu)
        break;
      }
    }
    return maxEval;
  }
  else{
    // cela evalu toutes les possibilites de jouer apres pour le joueur
    let minEval = Infinity;
    for (let i = 0; i < suivant.length; i++){
      let evaluation = MiniMax(suivant[i], depth - 1, alpha, beta, true);
      minEval = Math.min(minEval,evaluation);
      beta = Math.min(beta,evaluation);
      if (beta <= alpha){
        // permet d'elaguer l'arbre des possibles (un peu)
        break;
      }
    }
    return minEval;
  }
};

var positionCalcul = 0
function IA_MiniMax(gridTest){
    if(document.getElementById("startButton").getAttribute("value") == "Cancel"){
      // si on utilise pas l'alpha/beta c'est 8 fois plus de calcule pour un 6x6

      // avec une fonction qui regarde si il connait ou non la position pour eviter les calcules innutiles
      // si il l'a connait pas : connu = false
      // si il l'a connait : connu = 'une liste qui est le nouveau plateau'
      let connu = false;
      if (connu != false){
        return connu;
      }
      positionCalcul = 0
      // prend toutes les possibilites de jouer et les test avec algorithme MiniMax
      let possible = EvalPos(gridTest);
      let best = -Infinity;
      let bestplay = 0;
      var pourcent = 0;
      console.log("new test");
      for (let i = 0; i < possible.length; i++){
        let evaluations = MiniMax(possible[i],7,-Infinity,Infinity,false);
        if (evaluations > best){
          best = evaluations;
          bestplay = i;
        }else{
          if (evaluations == best){
            if (getRandomInt(2) == 1){
              best = evaluations;
              bestplay = i;
            }
          }
        }
        pourcent = Math.round( ((i+1) * 100) / (possible.length) );
        console.log(String(pourcent) + '%');
      }
      console.log(positionCalcul);
      return possible[bestplay];
  }
};



// ======================== Press Button Start Game ========================= //
// function startGame(){
//   // $("input").attr("readonly", true);
//   // document.getElementById("buttonChange").removeAttribute("onclick");
//   checkAll();
//   let toure = 0;
//   if (toure == 0){
//     let newGrid = IA_MiniMax(grid);
//     removeChoc(newGrid);
//   }
// };
