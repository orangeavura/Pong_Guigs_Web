let somRebatidaParedao;
let somRebatidaParede;
let somRebatidaLateral;

let img;
let menuImg;

let larguraImagem = 130;
let alturaImagem = 130;
let velocidadeX = 3;
let velocidadeY = 3;
let posX;
let posY;

let raioParedao = 80;
let larguraParedao = 20;
let alturaParedao = 130;
let posYEsquerdo;
let posYDireito;

let contadorEsquerdo = 0;
let contadorDireito = 0;

let exibirContadorTotal = true;
let exibirContadorEsquerdo = false;
let exibirContadorDireito = false;
let exibirTextoChao = true;
let exibirNomeArquivo = true;
let multiplicarVelocidade = true;
let contadorCapturas = 0;

let jogoPausado = false;
let menuAtivo = true;
let reiniciarJogoAoVoltarMenu = false;

let pastaImagens = "https://github.com/orangeavura/Pong_Guigs_Web/tree/main/Imagens";
let arquivosImagens = [];
let indiceImagem;

function preload() {
  somRebatidaParedao = loadSound("https://github.com/orangeavura/Pong_Guigs_Web/blob/main/Audios/Pong_Atari_1_Rebatida.wav");
  somRebatidaParede = loadSound("https://github.com/orangeavura/Pong_Guigs_Web/blob/main/Audios/Pong_Atari_2_Rebatida.wav");
  somRebatidaLateral = loadSound("https://github.com/orangeavura/Pong_Guigs_Web/blob/main/Audios/Pong_Atari_3_Rebatida.wav");

  menuImg = loadImage("https://github.com/orangeavura/Pong_Guigs_Web/blob/main/Menus/Pong_Guigs_Menu_1.png");
}

function setup() {
  createCanvas(1280, 720);
  posX = width / 2;
  posY = height / 2;
  posYEsquerdo = height / 2;
  posYDireito = height / 2;
}

function draw() {
  background(0);
  
  if (menuAtivo) {
    image(menuImg, 0, 0, width, height);
  } else {
    if (!jogoPausado) {
      moverRetangulos();
      moverImagem();
      rebaterImagem();
      desenharRetangulos();
      desenharImagem();
      mostrarContadores();
    }
  }
}

function keyPressed() {
  // Implemente a lógica de teclado aqui...
}

function moverRetangulos() {
  if (keyIsPressed) {
    if (key === 'w') {
      posYEsquerdo -= 5;
    } else if (key === 's') {
      posYEsquerdo += 5;
    }

    if (keyCode === UP_ARROW) {
      posYDireito -= 5;
    } else if (keyCode === DOWN_ARROW) {
      posYDireito += 5;
    }
  }

  posYEsquerdo = constrain(posYEsquerdo, alturaParedao / 2, height - alturaParedao / 2);
  posYDireito = constrain(posYDireito, alturaParedao / 2, height - alturaParedao / 2);
}

function moverImagem() {
  posX += velocidadeX;
  posY += velocidadeY;
}

function rebaterImagem() {
  if (posX > width - larguraImagem / 2 || posX < larguraImagem / 2) {
    velocidadeX *= -1;
    reproduzirSomRebatidaLateral();
    if (posX < larguraImagem / 2) {
      contadorEsquerdo--;
    } else {
      contadorDireito--;
    }
    selecionarImagemAleatoria();
  }

  if (posX - larguraImagem / 2 <= raioParedao + larguraParedao / 2 && posY >= posYEsquerdo - alturaParedao / 2 && posY <= posYEsquerdo + alturaParedao / 2) {
    velocidadeX *= -1;
    contadorEsquerdo++;
    reproduzirSomRebatidaParedao();
    if (multiplicarVelocidade) {
      velocidadeX *= 1.005;
      velocidadeY *= 1.005;
    }
    selecionarImagemAleatoria();
  } else if (posX + larguraImagem / 2 >= width - raioParedao - larguraParedao / 2 && posY >= posYDireito - alturaParedao / 2 && posY <= posYDireito + alturaParedao / 2) {
    velocidadeX *= -1;
    contadorDireito++;
    reproduzirSomRebatidaParedao();
    if (multiplicarVelocidade) {
      velocidadeX *= 1.005;
      velocidadeY *= 1.005;
    }
    selecionarImagemAleatoria();
  }

  if (posY > height - alturaImagem / 2 || posY < alturaImagem / 2) {
    velocidadeY *= -1;
    reproduzirSomRebatidaParede();
  }
}

function desenharRetangulos() {
  fill(255);
  rect(raioParedao, posYEsquerdo - alturaParedao / 2, larguraParedao, alturaParedao);
  rect(width - raioParedao - larguraParedao, posYDireito - alturaParedao / 2, larguraParedao, alturaParedao);
}

function desenharImagem() {
  image(img, posX - larguraImagem / 2, posY - alturaImagem / 2, larguraImagem, alturaImagem);
}

function mostrarContadores() {
  fill(255);
  textSize(20);

  if (exibirContadorEsquerdo) {
    text("Contador Esquerdo: " + contadorEsquerdo, 250, 30);
  }

  if (exibirContadorDireito) {
    text("Contador Direito: " + contadorDireito, width - 250, 30);
  }

  let contadorTotal = contadorEsquerdo + contadorDireito;

  if (exibirContadorTotal) {
    let contadorTotalX = width / 2;
    let contadorTotalY = 30;
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Total: " + contadorTotal, contadorTotalX, contadorTotalY);
  }

  if (exibirTextoChao) {
    let textoChaoX = width / 2;
    let textoChaoY = height - 30;
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Escola Guignard 80 Anos", textoChaoX, textoChaoY);

    if (exibirNomeArquivo) {
      let nomeCompleto = arquivosImagens[indiceImagem].name;
      let nomeArquivo = nomeCompleto.substring(0, nomeCompleto.lastIndexOf('.'));
      let nomeArquivoX = width / 2;
      let nomeArquivoY = 60;
      textAlign(CENTER, CENTER);
      textSize(20);
      text(" " + nomeArquivo, nomeArquivoX, nomeArquivoY);
    }
  }
}

function selecionarImagemAleatoria() {
  if (arquivosImagens.length > 0) {
    indiceImagem = floor(random(arquivosImagens.length));
    let caminhoImagem = arquivosImagens[indiceImagem].path;
    img = loadImage(caminhoImagem);
  }
}

function reproduzirSomRebatidaParedao() {
  if (somRebatidaParedao.isPlaying()) {
    somRebatidaParedao.stop();
  }
  somRebatidaParedao.play();
}

function reproduzirSomRebatidaParede() {
  if (somRebatidaParede.isPlaying()) {
    somRebatidaParede.stop();
  }
  somRebatidaParede.play();
}

function reproduzirSomRebatidaLateral() {
  if (somRebatidaLateral.isPlaying()) {
    somRebatidaLateral.stop();
  }
  somRebatidaLateral.play();
}
