let SFONDO = "#f5f1e8";
let PALETTE = ["#ff5a5f", "#ffb627", "#2ec4b6", "#3a86ff", "#9b5de5"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(SFONDO);

  //  glifi
  let numeroGlifi = 110;
  let numeroColonne = ceil(sqrt(numeroGlifi));              
  let numeroRighe = ceil(numeroGlifi / numeroColonne);     
  let dimColonna = windowWidth / numeroColonne;
  let dimRiga = windowHeight / numeroRighe;

  let xCorrente = 0;
  let yCorrente = 0;

  for (let g = 0; g < numeroGlifi; g++) {
    mioGlifo(xCorrente + dimColonna / 2, yCorrente + dimRiga / 2, min(dimColonna, dimRiga) * 0.8);
    xCorrente = xCorrente + dimColonna;

    if (xCorrente >= windowWidth - 1) {
      xCorrente = 0;
      yCorrente = yCorrente + dimRiga;
    }
  }
}

function draw() {
}

function mioGlifo(_x, _y, _size) {
  // parametri casuali
  let raggio = _size / 2;
  let petali = floor(random(5, 13));
  let lunghezza = raggio * random(0.6, 1);
  let larghezza = lunghezza * random(0.25, 0.6);
  let appuntito = random() < 0.5;       // true = stella, false = fiore
  let doppio = random() < 0.55;
  let puntini = random() < 0.5;
  let colore = random(PALETTE);
  let coloreCentro = random(PALETTE);

  push();
  translate(_x, _y);
  rotate(random(360));
  stroke(0);
  strokeWeight(1);

  // strati di petali
  let numeroStrati = 1;
  if (doppio) {
    numeroStrati = 2;
  }

  for (let s = 0; s < numeroStrati; s++) {
    push();
    fill(colore);

    if (s == 1) {
      rotate(180 / petali);   // sfasato di mezzo petalo
      scale(0.6);             // più piccolo
      fill(SFONDO);
    }

    for (let i = 0; i < petali; i++) {
      push();
      rotate((360 / petali) * i);
      translate(lunghezza / 2, 0);
      if (appuntito) {
        quad(-lunghezza / 2, 0, 0, -larghezza / 2, lunghezza / 2, 0, 0, larghezza / 2);
      } else {
        ellipse(0, 0, lunghezza, larghezza);
      }
      pop();
    }
    pop();
  }

  // puntini
  if (puntini) {
    noStroke();
    fill(colore);
    for (let i = 0; i < petali; i++) {
      push();
      rotate((360 / petali) * (i + 0.5));
      translate(raggio, 0);
      circle(0, 0, raggio * 0.1);
      pop();
    }
    stroke(0);
  }

  // centro
  fill(coloreCentro);
  circle(0, 0, raggio * 0.25);

  pop();
}
