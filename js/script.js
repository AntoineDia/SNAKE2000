//DIAMBU TOINTOIN

// Variables d'environement
const dc = document;
const w = window;
const c = dc.getElementById('canvas');
const ctx = c.getContext('2d');
var perdu = false;
var ss = 400;
var asmove = false;
var pomme = [0,0];
var message = "YOU LOSE, PRESS ANY KEY TO RESTART";

//le snake
so = 'l';
var sp = [
  {x:8,y:17},
  {x:9,y:17},
];

// Couleurs
const gazon1 = "#345830";
const gazon2 = "#4A7856";
const colcor = "#19C134";
const coltet = '#00FF28';

//Création du skane
function sk(){
  ctx.fillStyle = coltet;
  for(let i = 0; i < sp.length; i++){
    ctx.fillRect(mp(sp[i].x),mp(sp[i].y),mp(1),mp(1));
    ctx.fillStyle = colcor;
  }
};

//Création de la pomme
function newapple(){
    pomme[0] = Math.floor(Math.random() * 20);
    pomme[1] = Math.floor(Math.random() * 20);
  if(colision(pomme[0],pomme[1])){
    newapple();
  } else {
  ctx.fillStyle = 'red';
  ctx.fillRect(mp(pomme[0]),mp(pomme[1]),mp(1),mp(1));
  return;
  }
}


//ondulation latérale || déplacement du serpent
function odl(){
  setTimeout(function() {
    sx = 0;
    sy = 0;
    if(perdu){
      w.cancelAnimationFrame(move);
      return;
    }
    requestAnimationFrame(odl);
    switch (so) {
      case 'u': sy = -1;
        break;
      case 'd': sy = 1;
        break;
      case 'l': sx = -1;
        break;
      case 'r': sx = 1;
        break;
    }
    sp.unshift({x:sp[0].x+sx,y:sp[0].y+sy});
    pat(sp[sp.length-1].x,sp[sp.length-1].y);
    if(sp[0].x == pomme[0] && sp[0].y == pomme[1]){
      newapple();
      makeitfaster()
    } else {
      sp.pop();
    }
    sk();
    if(colision(sp[0].x,sp[0].y)){
      fin();
    }
    asmove = false;
  }, ss);
}

//colision
function colision(px,py){
  if(px < 0 || px >= 20 || py < 0 || py >= 20){
    return true;
  }
  for(let i = 2; i < sp.length; i++){
    if(px == sp[i].x && py == sp[i].y){
      return true;
    }
  }
  return false;
}

//Change les position x et y de touché coulé en coordonées sur le canvas
var mp = function(nmb){
  return nmb * 20;
};

//dessine le paterne
function pat(i,y){
  if((i+y)%2 == 0){
    ctx.fillStyle = gazon1;
  } else {
    ctx.fillStyle = gazon2;
  }
  ctx.fillRect(mp(i), mp(y), mp(1), mp(1));
}

//game over
function fin(){
  terrain();
  perdu = true;
  setTimeout(function(){ alert(message); }, 1);
  dc.addEventListener('keydown',function(){
    location.reload();
  });
}

//rempli la page du canvas
const setSize = function(){
  let x = w.innerWidth;
  let y = w.innerHeight;
  if(y < x){
    x = y;
  } else if(y > x){
    y = x;
  }
  c.setAttribute('style',`width: ${x}px; height: ${y}px;`);
};

//initialisation espace
setSize();
w.addEventListener('resize', setSize);

//le terrain
function terrain(){
  for (i = 0; i <= 20; i++) {
    for (y = 0; y <= 20; y++) {
      pat(i,y);
    }
  };
}
terrain();

//vitesse
function makeitfaster(){
  if (sp.length == 200){
    message = "YOU ARE A WINNER OF SNAKE2000! YOU CAN RESTART THE GAME NOW, YOU KNOW HOW ;)";
    fin();
  }
  if(ss > 150){
    ss = ss - 12;
  }
}

//le snake et la pomme
sk();
newapple();
var move = w.requestAnimationFrame(odl);

//les controles baby
function sndir(touche){
  if((touche.keyCode == 90 ||touche.keyCode == 38) && so != 'd' && !asmove){
    so = 'u';
    asmove = true;
  } else if ((touche.keyCode == 83 || touche.keyCode == 40) && so != 'u' && !asmove){
    so = 'd';
    asmove = true;
  } else if ((touche.keyCode == 81 || touche.keyCode == 37) && so != 'r' && !asmove){
    so = 'l';
    asmove = true;
  } else if ((touche.keyCode == 68 || touche.keyCode == 39) && so != 'l' && !asmove){
    so = 'r';
    asmove = true;
  }
};
dc.addEventListener('keydown',sndir);

//Le bonjour
setTimeout(function(){ alert("WELCOME TO SNAKE2000! \nWIN BY COVERING HALF OF THE FIELD! \nUSE ARROW KEY OR ZQSD TO MOVE"); }, 50);
